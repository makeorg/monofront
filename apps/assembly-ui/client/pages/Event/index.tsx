import React, { FC, useEffect } from 'react';
import { GliderStylesheet } from '@make.org/assets/css-in-js/GliderStyle';
import { OnboardingModal } from '../../../components/Onboarding/Modal';
import { Feed } from '../../../components/Feed';
import { PromptContainerStyle } from '../../../components/Prompt/style';
import { Suggestions } from '../../../components/Prompt/Suggestions';
import { PromptForm } from '../../../components/Prompt/Form';
import { Welcome } from '../../../components/Welcome';
import { useAssemblyContext } from '../../../store/context';
import { useTracking } from '../../../components/Tracking/useTracking';
import { useUtms } from '../../../components/Tracking/useUtms';

const ID_TYPEFORM = '01HTY794SDCAQ212HGV01DN8ER';

const EventPage: FC = () => {
  const tracker = useTracking();
  const { state } = useAssemblyContext();
  const { event, sessionId, visitorId } = state;
  const { slug: eventSlug, language: eventLanguage, id: eventId } = event;
  const utms = useUtms();

  useEffect(() => {
    tracker.track('DISPLAY-PAGE', {
      event_slug: eventSlug,
      page: 'main',
      language: eventLanguage,
      assembly_event_id: eventId,
      visitor_id: visitorId,
      session_id: sessionId,
      ...utms,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return (
    <>
      <GliderStylesheet />
      <OnboardingModal />
      <>
        <div data-tf-live={ID_TYPEFORM} />
        <script src="//embed.typeform.com/next/embed.js" />
      </>
      <Welcome />
      <Feed />
      <PromptContainerStyle>
        <Suggestions />
        <PromptForm />
      </PromptContainerStyle>
    </>
  );
};
// default export needed for loadable component
export default EventPage; // eslint-disable-line import/no-default-export
