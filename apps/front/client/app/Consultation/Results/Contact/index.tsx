import React, { FC } from 'react';
import i18n from 'i18next';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_DE,
} from '@make.org/utils/constants/config';
import { QuestionType } from '@make.org/types';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { useAppContext } from '@make.org/store';
import { ResultCardSidebar } from '../ResultCardSidebar';

type Props = {
  question: QuestionType;
};
export const ResultsContact: FC<Props> = ({ question }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const isDE = country === 'DE';
  const EMAIL = isDE ? CONTACT_EMAIL_DE : CONTACT_EMAIL;

  const mailToHref = `mailto:${EMAIL}?subject=${i18n.t(
    'consultation.results.download.email_object'
  )} - ${question.question}`;

  return (
    <ResultCardSidebar
      title={i18n.t('consultation.results.download.title')}
      description={i18n.t('consultation.results.download.contact')}
    >
      <RedHTMLLinkElementStyle href={mailToHref}>
        {EMAIL}
      </RedHTMLLinkElementStyle>
    </ResultCardSidebar>
  );
};
