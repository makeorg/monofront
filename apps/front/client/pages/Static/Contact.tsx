import { MetaTags } from '@make.org/components/MetaTags';
import React, { FC } from 'react';
import i18n from 'i18next';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_DE,
} from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';
import {
  StaticPageWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticParagraphStyle,
} from './style';

export const Contact: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const isDE = country === 'DE';
  const EMAIL = isDE ? CONTACT_EMAIL_DE : CONTACT_EMAIL;

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
          <RedHTMLLinkElementStyle href={`mailto:${EMAIL}`}>
            {`${EMAIL}`}
          </RedHTMLLinkElementStyle>
        </StaticParagraphStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default Contact; // eslint-disable-line import/no-default-export
