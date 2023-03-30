import React, { FC } from 'react';
import i18n from 'i18next';
import {
  HOST_ADDRESS,
  MAKE_ADDRESS,
  MAKE_CAPITAL,
  MAKE_RCS,
  HOST_PHONE_NUMBER,
  MAKE_PHONE_NUMBER,
  MAKE_DIRECTOR_NAME,
} from '@make.org/utils/constants/config';
import { getContactMailByCountry } from '@make.org/utils/helpers/countries';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { MetaTags } from '@make.org/components/MetaTags';
import { useAppContext } from '@make.org/store';
import {
  StaticPageWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticParagraphStyle,
  StaticPhoneLinkStyle,
} from './style';

const LegalPage: FC = () => {
  const { state } = useAppContext();
  const { country, countriesWithConsultations } = state.appConfig;
  const contactMailByCountry = getContactMailByCountry(
    country,
    countriesWithConsultations
  );

  return (
    <>
      <MetaTags
        title={i18n.t('meta.legal.title')}
        description={i18n.t('meta.legal.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          {i18n.t('legal.title')}
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          {i18n.t('legal.make_infos', {
            make_capital: MAKE_CAPITAL,
            make_address: MAKE_ADDRESS,
            make_rcs: MAKE_RCS,
          })}
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          {i18n.t('legal.mail')}
          &nbsp;
          <RedHTMLLinkElementStyle
            as="a"
            href={`mailto:${contactMailByCountry}`}
          >
            {`${contactMailByCountry}`}
          </RedHTMLLinkElementStyle>
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          {i18n.t('legal.make_phone')}
          <StaticPhoneLinkStyle href={`tel:${MAKE_PHONE_NUMBER}`}>
            {i18n.t('legal.make_phone_number', {
              make_phone_number: MAKE_PHONE_NUMBER,
            })}
          </StaticPhoneLinkStyle>
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          {i18n.t('legal.director', {
            make_director_name: MAKE_DIRECTOR_NAME,
          })}
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          {i18n.t('legal.host')}
          {i18n.t('legal.host_address', { make_host_address: HOST_ADDRESS })}
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          {i18n.t('legal.host_phone')}
          <StaticPhoneLinkStyle href={`tel:${HOST_PHONE_NUMBER}`}>
            {i18n.t('legal.host_phone_number', {
              host_number: HOST_PHONE_NUMBER,
            })}
          </StaticPhoneLinkStyle>
        </StaticParagraphStyle>
        <StaticParagraphStyle
          dangerouslySetInnerHTML={{
            __html: i18n.t('legal.eu_mention'),
          }}
        />
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default LegalPage; // eslint-disable-line import/no-default-export
