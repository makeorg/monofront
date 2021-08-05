import { MetaTags } from '@make.org/components/MetaTags';
import React, { FC } from 'react';
import i18n from 'i18next';
import { RedLinkHTMLElementStyle } from '@make.org/ui/elements/LinkElements';
import { CONTACT_EMAIL } from '@make.org/utils/constants/config';
import {
  StaticPageWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticParagraphStyle,
} from './style';

export const Contact: FC = () => (
  <>
    <MetaTags title={i18n.t('meta.contact.title')} />
    <StaticPageWrapperStyle>
      <StaticSecondLevelTitleStyle>
        {i18n.t('contact.contactUs')}
      </StaticSecondLevelTitleStyle>
      <StaticParagraphStyle>
        {i18n.t('contact.paragraph')}{' '}
        <RedLinkHTMLElementStyle href={`mailto:${CONTACT_EMAIL}`}>
          {`${CONTACT_EMAIL}`}
        </RedLinkHTMLElementStyle>
      </StaticParagraphStyle>
    </StaticPageWrapperStyle>
  </>
);

// default export needed for loadable component
export default Contact; // eslint-disable-line import/no-default-export
