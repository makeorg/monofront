import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { DATE } from '@make.org/types/enums';
import {
  GTU_DATE,
  MAKE_ADDRESS,
  MAKE_CAPITAL,
  MAKE_RCS,
} from '@make.org/utils/constants/config';
import { MetaTags } from '@make.org/components/MetaTags';
import { DateHelper } from '@make.org/utils/helpers/date';
import { getContactMailByCountry } from '@make.org/utils/helpers/countries';
import {
  getDataPageLink,
  getModerationPageLink,
} from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFlexibleParagraphs from 'remark-flexible-paragraphs';
import { StaticPageWrapperStyle } from '@make.org/front/client/pages/Static/style';
import { markdownComponents } from '../markdownComponent';

const TermsOfUse: FC = () => {
  const { state } = useAppContext();
  const { country, language, countriesWithConsultations } = state.appConfig;

  const contactMailByCountry = getContactMailByCountry(
    country,
    countriesWithConsultations
  );

  const replacements: Record<string, string> = {
    date: DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.PPP_FORMAT),
    validityDate: DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.P_FORMAT),
    moderationLink: getModerationPageLink(country, language),
    dataPageLink: getDataPageLink(country, language),
    contactEmail: contactMailByCountry,
    capital: MAKE_CAPITAL,
    rcs: MAKE_RCS,
    address: MAKE_ADDRESS,
  };

  return (
    <>
      <MetaTags
        title={i18n.t('meta.gtu.title')}
        description={i18n.t('meta.gtu.description')}
      />
      <StaticPageWrapperStyle>
        <ReactMarkdown
          components={markdownComponents()}
          remarkPlugins={[
            remarkGfm,
            [
              remarkFlexibleParagraphs,
              {
                paragraphClassName: 'custom',
                paragraphClassificationPrefix: 'custom',
              },
            ],
          ]}
        >
          {i18n.t('static:termsOfUse', replacements)}
        </ReactMarkdown>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default TermsOfUse; // eslint-disable-line import/no-default-export
