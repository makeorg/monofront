import React, { FC, useEffect } from 'react';
import { GliderStylesheet } from '@make.org/assets/css-in-js/GliderStyle';
import i18n from 'i18next';
import { MetaTags } from '../../../components/Meta';
import { Feed } from '../../../components/Feed';
import { PromptContainerStyle } from '../../../components/Prompt/style';
import { Suggestions } from '../../../components/Prompt/Suggestions';
import { PromptForm } from '../../../components/Prompt/Form';
import { Welcome } from '../../../components/Welcome';
import { useAssemblyContext } from '../../../store/context';
import { useTracking } from '../../../components/Tracking/useTracking';
import { useUtms } from '../../../components/Tracking/useUtms';

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
      <MetaTags
        title={i18n.t('meta.event.title')}
        description={i18n.t('meta.event.description')}
      />
      <GliderStylesheet />
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
