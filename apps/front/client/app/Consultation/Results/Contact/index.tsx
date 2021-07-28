// @flow
import React from 'react';
import { i18n } from 'Shared/i18n';
import { CONTACT_EMAIL } from 'Shared/constants/config';
import { type QuestionType } from 'Shared/types/question';
import { ResultCardSidebar } from 'Client/features/consultation/Results/ResultCardSidebar';

type Props = {
  question: QuestionType,
};
export const ResultsContact = ({ question }: Props) => {
  const mailToHref = `mailto:${CONTACT_EMAIL}?subject=${i18n.t(
    'consultation.results.download.email_object'
  )} - ${question.question}`;

  return (
    <ResultCardSidebar
      title={i18n.t('consultation.results.download.title')}
      description={i18n.t('consultation.results.download.contact')}
    >
      <a className="red-link" href={mailToHref}>
        {CONTACT_EMAIL}
      </a>
    </ResultCardSidebar>
  );
};
