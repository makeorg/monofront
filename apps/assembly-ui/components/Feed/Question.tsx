import React, { FC } from 'react';
import i18n from 'i18next';
import user from '../../assets/User.png';
import { DOCUMENT, TRANSCRIPT } from '.';
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

    if (question === '') {
      if (mode === DOCUMENT) {
        return i18n.t('feed.sources_document');
      }
      if (mode === TRANSCRIPT) {
        return i18n.t('feed.sources_video');
      }
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
