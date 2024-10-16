/* eslint-disable import/no-import-module-exports */
import React, { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { BrowserRouter } from 'react-router-dom';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { HeadProvider } from 'react-head';
import i18n from 'i18next';
import { loadableReady } from '@loadable/component';
import { TRANSLATION_COMMON_NAMESPACE } from '@make.org/utils/i18n/constants';
import { TrackingService } from '@make.org/tracking';
import { FacebookTracker } from '@make.org/tracking/trackers/facebook';
import { MakeorgTracker } from '@make.org/tracking/trackers/makeorg';
import { FakeTracker } from '@make.org/tracking/trackers/fake';
import { FacebookConversion } from '@make.org/tracking/apiConversion/facebookConversion';
import { ClientService } from '@make.org/tracking/apiConversion/clientService';
import { MixpanelTracker } from '@make.org/tracking/trackers/mixpanel';
import { TwitterConversion } from '@make.org/tracking/apiConversion/twitterConversion';
import { TwitterTracker } from '@make.org/tracking/trackers/twitter';
import { ClientLogger } from '@make.org/logger/clientLogger';
import { DefaultStylesheet } from '../utils/DefaultStyle';
import { env } from '../utils/env';
import { translationRessources } from '../i18n';
import { told } from './Told/told';
import { AppContainer } from './app';
import { AssemblyGlobalStateType } from '../types';
import AssemblyContextState from '../store/context';
import { initAssemblyDevState } from '../store/devState';
import {
  ITrackingContext,
  TrackingContext,
} from '../components/Tracking/TrackingContext';
import trackingConfiguration from '../trackingConfiguration.yaml';
import {
  ROUTE_ASSEMBLY_CONSENT,
  ROUTE_ASSEMBLY_FB_CONVERSION,
  ROUTE_ASSEMBLY_TW_CONVERSION,
} from '../utils/routes';
import { ErrorBoundary } from '../components/Error';

declare global {
  interface Window {
    ASSEMBLY_STATE: AssemblyGlobalStateType;
    COOKIE_FIRST_TOKEN: string;
    FB_PIXEL_ID?: string;
    TW_PIXEL_ID?: string;
    API_URL_CLIENT_SIDE?: string;
    NODE_ENV?: string;
    MIXPANEL_TOKEN?: string;
    FRONT_URL?: string;
    TOLD_TOKEN?: string;
  }
}

// @todo CAUTION !! Should not have process.env client side
if (process.env.NODE_ENV === 'development') {
  window.ASSEMBLY_STATE = initAssemblyDevState();
}
const serverState = window.ASSEMBLY_STATE;

const getTrackingService = () => {
  if (window?.NODE_ENV === 'development') {
    return new TrackingService(trackingConfiguration.EVENTS, [
      new FakeTracker(
        'facebook',
        trackingConfiguration.RECIPIENTS.facebook,
        ClientLogger.getInstance()
      ),
      new FakeTracker(
        'makeorg',
        trackingConfiguration.RECIPIENTS.makeorg,
        ClientLogger.getInstance()
      ),
      new FakeTracker(
        'mixpanel',
        trackingConfiguration.RECIPIENTS.mixpanel,
        ClientLogger.getInstance()
      ),
      new FakeTracker(
        'twitter',
        trackingConfiguration.RECIPIENTS.twitter,
        ClientLogger.getInstance()
      ),
    ]);
  }

  const fbConversionService = new FacebookConversion(
    window?.FB_PIXEL_ID ?? '',
    ClientLogger.getInstance()
  ).getClientConversion(
    new ClientService(),
    `${window?.FRONT_URL ?? '.'}${ROUTE_ASSEMBLY_FB_CONVERSION}`
  );
  const facebookTracker = new FacebookTracker(
    window?.FB_PIXEL_ID ?? '',
    fbConversionService,
    trackingConfiguration.RECIPIENTS.facebook,
    undefined,
    ClientLogger.getInstance()
  );

  const twConversionService = new TwitterConversion(
    window?.TW_PIXEL_ID ?? '',
    ClientLogger.getInstance()
  ).getClientConversion(
    new ClientService(),
    `${window?.FRONT_URL ?? '.'}${ROUTE_ASSEMBLY_TW_CONVERSION}`
  );

  const twitterTracker = new TwitterTracker(
    window?.TW_PIXEL_ID ?? '',
    twConversionService,
    trackingConfiguration.RECIPIENTS.twitter,
    trackingConfiguration.TWITTER_MAPPING,
    ClientLogger.getInstance()
  );

  const makeorgTracker = new MakeorgTracker(
    new ClientService(),
    `${window?.API_URL_CLIENT_SIDE}/tracking/panoramic`,
    trackingConfiguration.RECIPIENTS.makeorg,
    ClientLogger.getInstance()
  );

  const mixpanelTracker = new MixpanelTracker(
    window?.MIXPANEL_TOKEN ?? '',
    trackingConfiguration.RECIPIENTS.mixpanel,
    ClientLogger.getInstance()
  );

  return new TrackingService(
    trackingConfiguration.EVENTS,
    [facebookTracker, makeorgTracker, mixpanelTracker, twitterTracker],
    ClientLogger.getInstance()
  );
};

const initApp = async (state: AssemblyGlobalStateType) => {
  const { language } = state;
  const store = {
    ...state,
  };

  // I18n
  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    debug: env.isDev(),
    lng: language,
    resources: translationRessources,
    defaultNS: TRANSLATION_COMMON_NAMESPACE,
  });

  // Load Told
  told.load(window?.TOLD_TOKEN ?? '');

  loadableReady(() => {
    const appDom = document.getElementById('app');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const root = createRoot(appDom!);

    const renderMethod = (children: ReactNode, container: HTMLElement) => {
      if (module.hot) {
        return root.render(children);
      }

      return hydrateRoot(container, children);
    };

    if (!appDom) {
      return null;
    }

    const trackingService = getTrackingService();
    trackingService.updateConsent({
      necessary: true,
      performance: false,
      functional: false,
      advertising: false,
    });
    const trackContext: ITrackingContext = {
      track: (eventName: string, params: Record<string, string>) =>
        trackingService.sendAllTrackers(eventName, params),
      updateFromConsent: async (
        consent
      ): Promise<{ sessionId: string; visitorId: string } | null> => {
        trackingService.updateConsent(consent);
        try {
          const response = await fetch(
            `${window?.FRONT_URL}${ROUTE_ASSEMBLY_CONSENT}`,
            {
              method: 'POST',
              body: JSON.stringify(consent || {}),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          if (!response) {
            return null;
          }

          const result = await response.json();
          const facebookTracker = trackingService.findTracker('facebook') as
            | FacebookTracker
            | undefined;
          if (result.visitorId && facebookTracker) {
            facebookTracker.updateExternalId(result.visitorId);
          }

          return result;
        } catch (e) {
          const error = e as Error;
          ClientLogger.getInstance().logError(error);
          return null;
        }
      },
    };

    return renderMethod(
      <HeadProvider>
        <AssemblyContextState serverState={store}>
          <ErrorBoundary logger={ClientLogger.getInstance()}>
            <TrackingContext.Provider value={trackContext}>
              <BrowserRouter>
                <React.StrictMode>
                  <ModernNormalizeStylesheet />
                  <FontFacesStylesheet />
                  <DefaultStylesheet />
                  <AppContainer />
                </React.StrictMode>
              </BrowserRouter>
            </TrackingContext.Provider>
          </ErrorBoundary>
        </AssemblyContextState>
      </HeadProvider>,
      appDom
    );
  });
};

initApp(serverState);

if (module.hot) {
  module.hot.accept();
}
