import React, { FC } from 'react';
import {
  ContentStyle,
  ContentIconStyle,
  ThemeContainerStyle,
  AnswerContainerStyle,
} from './style';
import { TranscriptSources } from './Transcript';
import { FeedItemType } from '../../types';
import pano from '../../assets/IconPano.png';

export const Answer: FC<{ content: FeedItemType }> = ({ content }) => (
  <ContentStyle>
    <ContentIconStyle src={pano} alt="Logo" />
    <AnswerContainerStyle>
      <ThemeContainerStyle as="p">{content.content}</ThemeContainerStyle>
      {content.links && <TranscriptSources links={content.links} />}
    </AnswerContainerStyle>
  </ContentStyle>
);
