import { MetaTags } from '@make.org/components/MetaTags';
import React, { FC } from 'react';
import i18n from 'i18next';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { getContactMailByCountry } from '@make.org/utils/helpers/countries';
import { useAppContext } from '@make.org/store';
import {
  StaticPageWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticParagraphStyle,
} from './style';

const Contact: FC = () => {
  const { state } = useAppContext();
  const { country, countriesWithConsultations } = state.appConfig;
  const contactMailByCountry = getContactMailByCountry(
    country,
    countriesWithConsultations
  );

  return (
    <>
      <MetaTags
        title={i18n.t('meta.contact.title')}
        description={i18n.t('meta.contact.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          {i18n.t('contact.contactUs')}
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          {i18n.t('contact.paragraph')}{' '}
          <RedHTMLLinkElementStyle href={`mailto:${contactMailByCountry}`}>
            {`${contactMailByCountry}`}
          </RedHTMLLinkElementStyle>
        </StaticParagraphStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default Contact; // eslint-disable-line import/no-default-export
