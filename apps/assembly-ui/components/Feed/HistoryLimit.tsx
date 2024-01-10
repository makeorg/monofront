import React, { FC } from 'react';
import i18n from 'i18next';
import {
  ContentStyle,
  ContentIconStyle,
  AnswerContainerStyle,
  HistoryMaxContainerStyle,
  HistoryMaxTitleStyle,
  HistoryMaxTextStyle,
} from './style';
import pano from '../../assets/IconPano.png';

export const HistoryLimit: FC = () => (
  <ContentStyle>
    <ContentIconStyle src={pano} alt="Logo" />
    <AnswerContainerStyle>
      <HistoryMaxContainerStyle>
        <HistoryMaxTitleStyle>
          {i18n.t('feed.previous_answer')}
        </HistoryMaxTitleStyle>
        <div>
          <HistoryMaxTextStyle>{i18n.t('feed.archive')}</HistoryMaxTextStyle>
          <HistoryMaxTextStyle>{i18n.t('feed.retrieve')}</HistoryMaxTextStyle>
        </div>
      </HistoryMaxContainerStyle>
    </AnswerContainerStyle>
  </ContentStyle>
);
