import React, { FC } from 'react';
import { PromptResponseQuestion } from './Question';
import { PromptThemeResponse } from './Response';
import { PromptResponseContainerStyle, PromptResponseStyle } from './style';

const question = 'Quelles sont les thématiques de la convention ? ';

export const PromptResponseContainer: FC = () => (
  <PromptResponseContainerStyle>
    <PromptResponseStyle>
      <PromptResponseQuestion question={question} />
      <PromptThemeResponse />
    </PromptResponseStyle>
  </PromptResponseContainerStyle>
);
