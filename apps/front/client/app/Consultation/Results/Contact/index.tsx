import React, { FC } from 'react';
import i18n from 'i18next';
import { QuestionType } from '@make.org/types';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { useAppContext } from '@make.org/store';
import { getContactMailByCountry } from '@make.org/utils/helpers/countries';
import { ResultCardSidebar } from '../ResultCardSidebar';

type Props = {
  question: QuestionType;
};
export const ResultsContact: FC<Props> = ({ question }) => {
  const { state } = useAppContext();
  const { country, countriesWithConsultations } = state.appConfig;
  const contactMailByCountry = getContactMailByCountry(
    country,
    countriesWithConsultations
  );

  const mailToHref = `mailto:${contactMailByCountry}?subject=${i18n.t(
    'consultation.results.download.email_object'
  )} - ${question.question}`;

  return (
    <ResultCardSidebar
      title={i18n.t('consultation.results.download.title')}
      description={i18n.t('consultation.results.download.contact')}
    >
      <RedHTMLLinkElementStyle href={mailToHref}>
        {contactMailByCountry}
      </RedHTMLLinkElementStyle>
    </ResultCardSidebar>
  );
};
