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

type Props = { item: FeedItemType };

export const Answer: FC<Props> = ({ item }) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    if (env.isClientSide() && Math.min(window.innerWidth) < 969) {
      setIsTablet(true);
    }
  }, []);

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
            {item.displayActions && <Actions item={item} />}
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
