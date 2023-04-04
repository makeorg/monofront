import React, { FC, ReactNode } from 'react';
import {
  PRIVACY_POLICY_DATE,
  MAKE_ADDRESS,
  MAKE_RCS,
} from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import { DateHelper } from '@make.org/utils/helpers/date';
import { DATE } from '@make.org/types/enums';
import {
  getCountryDPA,
  getContactMailByCountry,
} from '@make.org/utils/helpers/countries';
import { getCookiesPageLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFlexibleParagraphs from 'remark-flexible-paragraphs';
import {
  StaticPageWrapperStyle,
  StaticFourthLevelBisTitleStyle,
} from '../style';
import { markdownComponents } from '../markdownComponent';

export const Data: FC = () => {
  const { state } = useAppContext();
  const { country, countriesWithConsultations } = state.appConfig;

  const contactMailByCountry = getContactMailByCountry(
    country,
    countriesWithConsultations
  );

  const replacements: Record<string, string> = {
    date: DateHelper.localizedAndFormattedDate(
      PRIVACY_POLICY_DATE,
      DATE.PPP_FORMAT
    ),
    cookiesPageLink: getCookiesPageLink(country),
    contactEmail: contactMailByCountry,
    rcs: MAKE_RCS,
    address: MAKE_ADDRESS,
    DPAName: getCountryDPA(country).name,
    DPALink: getCountryDPA(country).link,
  };

  type elProps = {
    children: ReactNode;
  };

  const h4Component = ({ children }: elProps) => (
    <StaticFourthLevelBisTitleStyle>{children}</StaticFourthLevelBisTitleStyle>
  );

  return (
    <>
      <MetaTags
        title={i18n.t('meta.privacy_policy.title')}
        description={i18n.t('meta.privacy_policy.description')}
      />
      <StaticPageWrapperStyle>
        <ReactMarkdown
          components={{
            ...markdownComponents(),
            h4: h4Component,
          }}
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
          {i18n.t('static:data', replacements)}
        </ReactMarkdown>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default Data; // eslint-disable-line import/no-default-export
