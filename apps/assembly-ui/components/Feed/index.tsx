import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Question } from './Question';
import { FeedContainerStyle } from './style';
import { useAssemblyContext } from '../../store/context';
import { Answer } from './Answer';
import { HistoryLimit } from './HistoryLimit';
import { removeFeedLastItem } from '../../store/feed/actions';

export const TRANSCRIPT = 'transcriptStd';
export const TRANSCRIPT_EXPERT = 'transcriptExpert';
export const DOCUMENT = 'documentStd';
export const SOURCE_TYPE_VIDEO = 'VIDEO';
export const SOURCE_TYPE_DOCUMENT = 'PDF';

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
  const [maxHistory, setMaxHistory] = useState(false);
  const FEED_MAX_LENGTH = 5;

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
          <Question question={item.question} />
          <Answer item={item} />
        </div>
      ))}
    </FeedContainerStyle>
  );
};
