import React, { FC } from 'react';
import i18n from 'i18next';
import user from '../../assets/User.png';
import { SOURCE_TYPE_DOCUMENT, SOURCE_TYPE_VIDEO } from '.';
import {
  QuestionContainerStyle,
  QuestionImgStyle,
  QuestionUserStyle,
  QuestionStyle,
} from './style';

type Props = {
  question: string;
  source_type?: string;
};

export const Question: FC<Props> = ({ question, source_type }) => {
  const compositeQuestion = () => {
    if (source_type === SOURCE_TYPE_DOCUMENT) {
      return i18n.t('feed.sources_document');
    }
    if (source_type === SOURCE_TYPE_VIDEO) {
      return i18n.t('feed.sources_video');
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
