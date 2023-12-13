import React, { FC } from 'react';
import { ContentStyle, ContentIconStyle, ThemeContainerStyle } from './style';
import pano from '../../assets/IconPano.png';

export const Answer: FC<{ content: string }> = ({ content }) => (
  <ContentStyle>
    <ContentIconStyle src={pano} alt="Logo" />
    <ThemeContainerStyle as="p">{content}</ThemeContainerStyle>
  </ContentStyle>
);
