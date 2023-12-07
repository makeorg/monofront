import React, { FC } from 'react';
import { PromptResponseQuestion } from './PromptResponseQuestion';
import { PromptThemeResponse } from './PromptThemeResponse';
import { PromptResponseContainerStyle, PromptResponseStyle } from './style';

const response = [
  'Coût de la vie',
  'Salaires et primes',
  'Consommation',
  'Production locale & importation',
  'Pauvreté',
  'Fiscalité locale',
  'Concurrence & monopoles',
  'Transports',
  'Octroi de mer',
  'Bouclier qualité prix (BQP)',
];

const question = 'Quelles sont les thématiques de la convention ? ';

export const PromptResponseContainer: FC = () => (
  <PromptResponseContainerStyle>
    <PromptResponseStyle>
      <PromptResponseQuestion question={question} />
      <PromptThemeResponse response={response} />
    </PromptResponseStyle>
  </PromptResponseContainerStyle>
);
