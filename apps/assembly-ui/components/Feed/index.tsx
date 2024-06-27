import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Question } from './Question';
import { FeedContainerStyle } from './style';
import { useAssemblyContext } from '../../store/context';
import { Answer } from './Answer';
import { HistoryLimit } from './HistoryLimit';
import { removeFeedLastItem } from '../../store/feed/actions';
import { StreamLLM } from '../Prompt/Stream';
import { useTracking } from '../Tracking/useTracking';
import { SourcesAnswer } from './Sources/SourcesAnswer';

export const SOURCE_TYPE_VIDEO = 'VIDEO';
export const SOURCE_TYPE_DOCUMENT = 'PDF';
const RESPONSE_TRIGGER_PARAM = 'response-trigger';

const scrollToLastElement = (id: string) => {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: 'smooth',
  });
};

export const Feed: FC = () => {
  const { state, dispatch } = useAssemblyContext();
  const { feed, visitorId, event, termQueries } = state;
  const { slug: eventSlug } = event;
  const { items } = feed;
  const [maxHistory, setMaxHistory] = useState(false);
  const FEED_MAX_LENGTH = 5;

  const { search } = useLocation();
  const urlSearchParams = new URLSearchParams(search);
  const searchTitle = urlSearchParams
    .get(RESPONSE_TRIGGER_PARAM)
    ?.toLowerCase();
  const responseTriggerTermQuery = searchTitle
    ? termQueries.find(
        termQuery => termQuery.title.toLowerCase() === searchTitle
      )
    : undefined;
  const { startStream } = StreamLLM(responseTriggerTermQuery?.value || '');
  const tracker = useTracking();

  useEffect(() => {
    if (responseTriggerTermQuery) {
      const feedItemId = startStream();
      tracker.track('ACTION-AUTO-PROMPT', {
        visitor_id: visitorId,
        event_slug: eventSlug,
        submit_id: feedItemId,
        suggestion_label: responseTriggerTermQuery.title,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseTriggerTermQuery]);

  useEffect(() => {
    if (items.length > FEED_MAX_LENGTH) {
      dispatch(removeFeedLastItem());
      if (!maxHistory) {
        setMaxHistory(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  useLayoutEffect(() => {
    const lastElement = [...items].pop(); // Need to be spread to avoid initial items modification
    if (lastElement) {
      scrollToLastElement(lastElement.id);
    }
  }, [items]);

  return (
    <FeedContainerStyle role="feed" aria-live="polite">
      {maxHistory && <HistoryLimit />}
      {items.map(item => (
        <div role="article" key={item.id} id={item.id}>
          <Question question={item.question} source_type={item.source_type} />
          {item.sources ? (
            <SourcesAnswer item={item} />
          ) : (
            <Answer item={item} />
          )}
        </div>
      ))}
    </FeedContainerStyle>
  );
};
