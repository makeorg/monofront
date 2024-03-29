import React, { FC } from 'react';
import { HeadProvider } from 'react-head';
import Logo from '@make.org/assets/images/logo.svg';
import i18n from 'i18next';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  NoCookiesTitleStyle,
  NoCookiesSectionStyle,
  NoCookiesSeparatorStyle,
  NoCookiesParagraphStyle,
  NoCookiesAltParagraphStyle,
} from './style';

export const NoCookies: FC = () => (
  <NoCookiesSectionStyle>
    <FontFacesStylesheet />
    <ModernNormalizeStylesheet />
    <DefaultStylesheet />
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
    {/* @ts-ignore: remove after upgrade to react18 */}
    <HeadProvider>
      <MetaTags title="meta.no_cookies.title" />
    </HeadProvider>
    <CenterColumnStyle>
      <NoCookiesTitleStyle>
        <img src={JSON.stringify(Logo)} alt="Make.org" />
      </NoCookiesTitleStyle>
      <SecondLevelTitleStyle>
        {i18n.t('no_cookies.title')}
      </SecondLevelTitleStyle>
      <NoCookiesSeparatorStyle />
      <NoCookiesParagraphStyle>
        {i18n.t('no_cookies.first_paragraph')}
      </NoCookiesParagraphStyle>
      <NoCookiesParagraphStyle>
        {i18n.t('no_cookies.second_paragraph')}
      </NoCookiesParagraphStyle>
      <NoCookiesParagraphStyle className="column">
        {i18n.t('no_cookies.information')}
        <RedHTMLLinkElementStyle href={`https://${i18n.t('no_cookies.link')}`}>
          {i18n.t('no_cookies.link')}
        </RedHTMLLinkElementStyle>
      </NoCookiesParagraphStyle>

      <NoCookiesParagraphStyle>
        {i18n.t('no_cookies.thanks')}
      </NoCookiesParagraphStyle>
    </CenterColumnStyle>
    <NoCookiesAltParagraphStyle
      dangerouslySetInnerHTML={{
        __html: i18n.t('no_cookies.footer'),
      }}
    />
  </NoCookiesSectionStyle>
);
