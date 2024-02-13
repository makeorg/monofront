import React, { FC } from 'react';
import i18n from 'i18next';
import user from '../../assets/User.png';
import { DOCUMENT } from '.';
import {
  QuestionContainerStyle,
  QuestionImgStyle,
  QuestionUserStyle,
  QuestionStyle,
} from './style';

type Props = {
  question: string;
  mode: string;
};

export const Question: FC<Props> = ({ question, mode }) => {
  const compositeQuestion = () => {
    if (mode === DOCUMENT) {
      return `${i18n.t('feed.answer_document')}  ${question}`;
    }

    return question;
  };

  return (
    <QuestionContainerStyle>
      <QuestionUserStyle>
        <QuestionImgStyle>
          <img src={user} alt="" />
        </QuestionImgStyle>
        {i18n.t('prompt.me')}
      </QuestionUserStyle>
      <QuestionStyle>{compositeQuestion()}</QuestionStyle>
    </QuestionContainerStyle>
  );
};
