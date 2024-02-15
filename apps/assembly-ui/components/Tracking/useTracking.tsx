import { useContext, useEffect } from 'react';
import { useCookieFirst } from 'react-cookiefirst';
import { ITrackingContext, TrackingContext } from './TrackingContext';

export const useTracking = (): ITrackingContext => {
  const trackingContext = useContext(TrackingContext);
  const { consent } = useCookieFirst();

  useEffect(() => {
    trackingContext.updateFromConsent(consent);
  }, [consent, trackingContext]);

  return trackingContext;
};
