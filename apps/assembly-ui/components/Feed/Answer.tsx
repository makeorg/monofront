import React, { FC, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { LLMErrorLimit } from '../Prompt/Stream';
import { ContentStyle, ContentIconStyle, AnswerContainerStyle } from './style';
import { FeedItemType } from '../../types';
import pano from '../../assets/IconPano.png';
import { useAssemblyContext } from '../../store/context';
import { useTracking } from '../Tracking/useTracking';
import { ShowSources } from './Sources/ShowSources';
import { CitizenVoice } from './CitizenVoice';

type Props = { item: FeedItemType; index: number };

export const Answer: FC<Props> = ({ item, index }) => {
  const [isTracked, setIsTracked] = useState(false);
  const { state } = useAssemblyContext();
  const { event } = state;
  const { isStreaming } = state.feed;
  const tracker = useTracking();

  useEffect(() => {
    if (!isTracked && item.text && !isStreaming) {
      tracker.track('DISPLAY-PROMPT-ANSWER', {
        submit_id: item.id,
        prompt_result_success: 'success',
        event_slug: event.slug,
        user_query: item.question,
        llm_response: item.text,
      });
      setIsTracked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.text, isStreaming]);

  return (
    <>
      <ContentStyle>
        <ContentIconStyle src={pano} alt="Logo" />
        <AnswerContainerStyle>
          <ReactMarkdown>{item.text}</ReactMarkdown>
          {item.text.trim().length > LLMErrorLimit &&
            item.chunks &&
            item.chunks.length > 0 && <ShowSources chunks={item.chunks} />}
        </AnswerContainerStyle>
      </ContentStyle>
      {index % 2 !== 0 && item.chunks && <CitizenVoice />}
    </>
  );
};
