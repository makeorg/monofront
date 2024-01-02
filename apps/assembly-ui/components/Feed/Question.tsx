import React, { FC } from 'react';
import i18n from 'i18next';
import user from '../../assets/User.png';
import {
  QuestionContainerStyle,
  QuestionImgStyle,
  QuestionUserStyle,
  QuestionStyle,
} from './style';

type Props = {
  question: string;
};

export const Question: FC<Props> = ({ question }) => (
  <QuestionContainerStyle>
    <QuestionUserStyle>
      <QuestionImgStyle>
        <img src={user} alt="" />
      </QuestionImgStyle>
      {i18n.t('prompt.me')}
    </QuestionUserStyle>
    <QuestionStyle>{question}</QuestionStyle>
  </QuestionContainerStyle>
);
