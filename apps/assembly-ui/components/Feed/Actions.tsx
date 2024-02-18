import React, { FC, useState } from 'react';
import i18n from 'i18next';
import {
  ActionsButtonStyle,
  ActionsButtonsContainerStyle,
  ActionsContainerStyle,
  ActionsTitleStyle,
} from './style';
import { DOCUMENT, TRANSCRIPT } from '.';
import { FeedItemType } from '../../types';
import { useAssemblyContext } from '../../store/context';
import { StreamLLM } from '../Prompt/Stream';
import { disableFeedStreaming } from '../../store/feed/actions';
import { useTracking } from '../Tracking/useTracking';

type Props = {
  item: FeedItemType;
};

export const Actions: FC<Props> = ({ item }) => {
  const [mode, setMode] = useState(TRANSCRIPT);
  const { state, dispatch } = useAssemblyContext();
  const { feed, visitorId, event } = state;
  const { slug: eventSlug } = event;
  const { isStreaming } = feed;

  const tracker = useTracking();
  const { startStream } = StreamLLM(item.question, mode);

  const handleDocumentQuestion = () => {
    setMode(DOCUMENT);
    dispatch(disableFeedStreaming());

    const feedItemId = startStream();
    tracker.track('ACTION-DOCUMENT', {
      visitor_id: visitorId,
      event_slug: eventSlug,
      submit_id: feedItemId,
    });
  };

  return (
    <ActionsContainerStyle>
      <ActionsTitleStyle>{i18n.t('feed.hyperlinks_title')}</ActionsTitleStyle>
      <ActionsButtonsContainerStyle>
        <ActionsButtonStyle
          type="button"
          disabled={isStreaming}
          onClick={() => handleDocumentQuestion()}
        >
          {i18n.t('feed.document_sources')}
        </ActionsButtonStyle>
      </ActionsButtonsContainerStyle>
    </ActionsContainerStyle>
  );
};
