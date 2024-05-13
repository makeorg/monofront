import React, { FC } from 'react';
import i18n from 'i18next';
import { QuestionType } from '@make.org/types';
import { ResultCardReportButtonStyle } from '../ResultCardSidebar/style';
import { ResultCardSidebar } from '../ResultCardSidebar';

type Props = {
  question: QuestionType;
};
export const ResultsReport: FC<Props> = ({ question }) => (
  <ResultCardSidebar
    title={i18n.t('consultation.results.download.title')}
    description={i18n.t('consultation.results.download.contact')}
  >
    <ResultCardReportButtonStyle
      as="a"
      href={question.reportUrl}
      target="_blank"
      rel="noopener"
    >
      {i18n.t('consultation.results.download.button')}
    </ResultCardReportButtonStyle>
  </ResultCardSidebar>
);
