import React, { FC } from 'react';
import {
  ContentStyle,
  ContentIconStyle,
  ThemeContainerStyle,
  AnswerContainerStyle,
} from './style';
import { Sources } from './Sources';
import { FeedItemType } from '../../types';
import pano from '../../assets/IconPano.png';

export const Answer: FC<{ content: FeedItemType }> = ({ content }) => (
  <ContentStyle>
    <ContentIconStyle src={pano} alt="Logo" />
    <AnswerContainerStyle>
      <ThemeContainerStyle as="p">{content.text}</ThemeContainerStyle>
      {content.chunks && content.chunks.length > 0 && (
        <Sources chunks={content.chunks} />
      )}
    </AnswerContainerStyle>
  </ContentStyle>
);
