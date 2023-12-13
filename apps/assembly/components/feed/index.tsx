import React, { FC, useEffect } from 'react';
import { Question } from './Question';
import { Themes } from './Themes';
import { FeedContainerStyle } from './style';
import { useAssemblyContext } from '../../store/context';
import { Answer } from './Answer';
import { removeFeedLastItem } from '../../store/feed/actions';

export const THEMES = 'THEMES';
export const GENERATED_CONTENT = 'GENERATED_CONTENT';

export const Feed: FC = () => {
  const { state, dispatch } = useAssemblyContext();
  const { feed } = state;
  const FEED_MAX_LENGTH = 5;

  useEffect(() => {
    if (feed.length > FEED_MAX_LENGTH) {
      dispatch(removeFeedLastItem());
    }
  }, [feed.length]);

  return (
    <FeedContainerStyle role="feed" aria-live="polite">
      {feed.map(item => (
        <div role="article" key={item.id}>
          <Question question={item.question} />
          {item.type === THEMES ? (
            <Themes />
          ) : (
            <Answer content={item.content} />
          )}
        </div>
      ))}
    </FeedContainerStyle>
  );
};
