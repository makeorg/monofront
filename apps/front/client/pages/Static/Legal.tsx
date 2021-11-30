import React, { FC } from 'react';
import i18n from 'i18next';
import {
  CONTACT_EMAIL,
  HOST_ADDRESS,
  MAKE_ADDRESS,
  MAKE_CAPITAL,
  MAKE_RCS,
  HOST_PHONE_NUMBER,
  CNIL_NUMBER,
  MAKE_PHONE_NUMBER,
  CONTACT_EMAIL_DE,
} from '@make.org/utils/constants/config';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { MetaTags } from '@make.org/components/MetaTags';
import { useAppContext } from '@make.org/store';
import {
  StaticPageWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticParagraphStyle,
  StaticPhoneLinkStyle,
} from './style';

export const LegalPage: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const isDE = country === 'DE';
  const EMAIL = isDE ? CONTACT_EMAIL_DE : CONTACT_EMAIL;

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
          <RedHTMLLinkElementStyle as="a" href={`mailto:${EMAIL}`}>
            {`${EMAIL}`}
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
          {i18n.t('legal.director')}
          Axel Dauchez
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
        <StaticParagraphStyle>
          {i18n.t('legal.cnil')}
          {i18n.t('legal.cnil_number', {
            cnil_number: CNIL_NUMBER,
          })}
        </StaticParagraphStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default LegalPage; // eslint-disable-line import/no-default-export
