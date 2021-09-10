import React, { FC } from 'react';
import i18n from 'i18next';
import { CONTACT_EMAIL } from '@make.org/utils/constants/config';
import { QuestionType } from '@make.org/types';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { ResultCardSidebar } from '../ResultCardSidebar';

type Props = {
  question: QuestionType;
};
export const ResultsContact: FC<Props> = ({ question }) => {
  const mailToHref = `mailto:${CONTACT_EMAIL}?subject=${i18n.t(
    'consultation.results.download.email_object'
  )} - ${question.question}`;

  return (
    <ResultCardSidebar
      title={i18n.t('consultation.results.download.title')}
      description={i18n.t('consultation.results.download.contact')}
    >
      <RedHTMLLinkElementStyle href={mailToHref}>
        {CONTACT_EMAIL}
      </RedHTMLLinkElementStyle>
    </ResultCardSidebar>
  );
};
