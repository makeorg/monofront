import React, { FC, useState, useEffect } from 'react';
import { env } from '@make.org/assets/env';
import {
  ContentStyle,
  ContentIconStyle,
  ThemeContainerStyle,
  AnswerContainerStyle,
} from './style';
import { SourcesMobile } from './SourcesMobile';
import { Sources } from './Sources';
import { FeedItemType, ChunkType } from '../../types';
import pano from '../../assets/IconPano.png';

export const Answer: FC<{ content: FeedItemType }> = ({ content }) => {
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
        <ThemeContainerStyle as="p">{content.text}</ThemeContainerStyle>
        {content.chunks && content.chunks.length > 0 && sources(content.chunks)}
      </AnswerContainerStyle>
    </ContentStyle>
  );
};
