import React, { FC } from 'react';
import i18n from 'i18next';
import user from '../../assets/User.png';
import {
  PromptResponseQuestionContainerStyle,
  PromptResponseQuestionImgStyle,
  PromptResponseQuestionUserStyle,
  PromptResponseQuestionStyle,
} from './style';

type Props = {
  question: string;
};

export const PromptResponseQuestion: FC<Props> = ({ question }) => (
  <PromptResponseQuestionContainerStyle>
    <PromptResponseQuestionUserStyle>
      <PromptResponseQuestionImgStyle>
        <img src={user} alt="" />
      </PromptResponseQuestionImgStyle>
      {i18n.t('prompt.me')}
    </PromptResponseQuestionUserStyle>
    <PromptResponseQuestionStyle>{question}</PromptResponseQuestionStyle>
  </PromptResponseQuestionContainerStyle>
);
