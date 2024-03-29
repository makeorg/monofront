import React, { FC, useState, useEffect } from 'react';
import { env } from '@make.org/assets/env';
import i18n from 'i18next';
import ReactMarkdown from 'react-markdown';
import { LLMErrorLimit } from '../Prompt/Stream';
import {
  ContentStyle,
  ContentIconStyle,
  AnswerContainerStyle,
  SourcesTitleStyle,
} from './style';
import { SourcesMobile } from './SourcesMobile';
import { Sources } from './Sources';
import { FeedItemType, ChunkType } from '../../types';
import pano from '../../assets/IconPano.png';
import { Actions } from './Actions';
import { useAssemblyContext } from '../../store/context';
import { useTracking } from '../Tracking/useTracking';
import { TRANSCRIPT } from '.';

type Props = { item: FeedItemType };

export const Answer: FC<Props> = ({ item }) => {
  const [isTablet, setIsTablet] = useState(false);
  const [isTracked, setIsTracked] = useState(false);
  const { state } = useAssemblyContext();
  const { isStreaming } = state.feed;
  const tracker = useTracking();

  useEffect(() => {
    if (env.isClientSide() && Math.min(window.innerWidth) < 969) {
      setIsTablet(true);
    }
  }, []);

  useEffect(() => {
    if (!isTracked && item.text.length && !isStreaming) {
      tracker.track('DISPLAY-PROMPT-ANSWER', {
        submit_id: item.id,
        prompt_result_success: 'success',
        prompt_fired_by: item.mode === TRANSCRIPT ? 'main' : 'document',
      });
      setIsTracked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.text, isStreaming]);

  const sources = (chunks: ChunkType[]) => {
    if (isTablet) {
      return <SourcesMobile chunks={chunks} />;
    }
    return <Sources chunks={chunks} />;
  };

  return (
    <ContentStyle>
      <ContentIconStyle src={pano} alt="Logo" />
      <AnswerContainerStyle>
        <ReactMarkdown>{item.text}</ReactMarkdown>
        {item.text.trim().length > LLMErrorLimit && (
          <>
            {item.displayActions && item.mode === TRANSCRIPT && (
              <Actions item={item} />
            )}
            {item.chunks && item.chunks.length > 0 && (
              <>
                <SourcesTitleStyle>
                  {i18n.t('feed.sources')}&nbsp;
                </SourcesTitleStyle>
                {sources(item.chunks)}
              </>
            )}
          </>
        )}
      </AnswerContainerStyle>
    </ContentStyle>
  );
};
