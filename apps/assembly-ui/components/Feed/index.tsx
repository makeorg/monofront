import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Question } from './Question';
import { FeedContainerStyle } from './style';
import { useAssemblyContext } from '../../store/context';
import { Answer } from './Answer';
import { HistoryLimit } from './HistoryLimit';
import { removeFeedLastItem } from '../../store/feed/actions';
import { StreamLLM } from '../Prompt/Stream';

export const TRANSCRIPT = 'transcriptStd';
export const DOCUMENT = 'documentStd';
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
  const { items } = state.feed;
  const { termQueries } = state;
  const [maxHistory, setMaxHistory] = useState(false);
  const FEED_MAX_LENGTH = 5;

  const { search } = useLocation();
  const urlSearchParams = new URLSearchParams(search);
  const searchQuery = urlSearchParams.get(RESPONSE_TRIGGER_PARAM);
  const decodedQuery = decodeURIComponent(searchQuery || '');
  const responseTriggerTermQuery = termQueries.find(
    termQuery => termQuery.title.toLowerCase() === decodedQuery.toLowerCase()
  );

  const { setStartStream } = StreamLLM(
    responseTriggerTermQuery?.value || '',
    TRANSCRIPT
  );

  useEffect(() => {
    if (responseTriggerTermQuery) {
      setStartStream(true);
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
          <Question question={item.question} mode={item.mode} />
          <Answer item={item} />
        </div>
      ))}
    </FeedContainerStyle>
  );
};
