import React, { FC, useEffect, useLayoutEffect } from 'react';
import { Question } from './Question';
import { FeedContainerStyle } from './style';
import { useAssemblyContext } from '../../store/context';
import { Answer } from './Answer';
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
  const { feed } = state;
  const FEED_MAX_LENGTH = 5;

  useEffect(() => {
    if (feed.length > FEED_MAX_LENGTH) {
      dispatch(removeFeedLastItem());
    }
  }, [feed.length]);

  useLayoutEffect(() => {
    const lastElement = [...feed].pop(); // Need to be spread to avoid initial feed modification
    if (lastElement) {
      scrollToLastElement(lastElement.id);
    }
  }, [feed]);

  return (
    <FeedContainerStyle role="feed" aria-live="polite">
      {feed.map(item => (
        <div role="article" key={item.id} id={item.id}>
          <Question question={item.question} />
          <Answer content={item} />
        </div>
      ))}
    </FeedContainerStyle>
  );
};
