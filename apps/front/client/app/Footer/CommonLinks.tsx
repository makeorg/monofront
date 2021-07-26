import React from 'react';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import {
  getDataPageLink,
  getGTUPageLink,
  getLegalPageLink,
} from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { FooterItemLinkStyle, FooterItemStyle } from './style';

export const FooterCommonLinks: React.FC = () => {
  const { state } = useAppContext();
  const { country, language } = state.appConfig;

  return (
    <>
      <FooterItemStyle>
        <FooterItemLinkStyle
          onClick={scrollToTop}
          to={getLegalPageLink(country, language)}
        >
          {i18n.t('main_footer.legal')}
        </FooterItemLinkStyle>
      </FooterItemStyle>
      <FooterItemStyle>
        <FooterItemLinkStyle
          onClick={scrollToTop}
          to={getGTUPageLink(country, language)}
        >
          {i18n.t('main_footer.terms')}
        </FooterItemLinkStyle>
      </FooterItemStyle>
      <FooterItemStyle>
        <FooterItemLinkStyle
          onClick={scrollToTop}
          to={getDataPageLink(country, language)}
        >
          {i18n.t('main_footer.data')}
        </FooterItemLinkStyle>
      </FooterItemStyle>
    </>
  );
};
