import React from 'react';
import i18n from 'i18next';
import { ColumnToRowElementStyle } from '@make.org/ui/elements/FlexElements';
import {
  getContactPageLink,
  getCookiesPageLink,
} from '@make.org/utils/helpers/url';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { NAVIGATION, PANEL, IDS } from '@make.org/types/enums';

import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { modalShowCountries } from '@make.org/store/actions/modal';
import { isSequencePage as getIsSequencePage } from '@make.org/utils/routes';
import { useLocation } from 'react-router';
import { useAppContext } from '@make.org/store';
import {
  FooterStyle,
  FooterNavStyle,
  FooterItemStyle,
  FooterItemLinkStyle,
  FooterWrapperSecondListStyle,
  FooterWrapperThirdListStyle,
  FooterItemAltLinkStyle,
  FooterCountryIconStyle,
  FooterContactIconStyle,
} from '../style';
import { FooterCommonLinks } from '../CommonLinks';

/**
 * Renders Main Footer
 */
export const FooterINT: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const location = useLocation();
  const { country, language } = state.appConfig;
  const isSequencePage = getIsSequencePage(location.pathname);

  return country ? (
    <FooterStyle
      id={IDS.MAIN_FOOTER}
      className={`${NAVIGATION.NAVIGATION_ARIA_NEGATIVE_TAB_CLASS} ${
        PANEL.PANEL_ARIA_NEGATIVE_TAB_CLASS
      } ${isSequencePage && 'extra-mobile-padding-bottom'}`}
      data-cy-container="footer"
    >
      <FooterNavStyle aria-label={i18n.t('common.footer_nav')}>
        <ColumnToRowElementStyle>
          <FooterWrapperSecondListStyle>
            <FooterCommonLinks />
            <FooterItemStyle>
              <FooterItemLinkStyle
                onClick={scrollToTop}
                to={getCookiesPageLink(country)}
              >
                {i18n.t('main_footer.cookies')}
              </FooterItemLinkStyle>
            </FooterItemStyle>
          </FooterWrapperSecondListStyle>
          <FooterWrapperThirdListStyle>
            <FooterItemStyle className="no-bullet">
              <FooterItemAltLinkStyle
                className="underline"
                as={UnstyledButtonStyle}
                onClick={() => dispatch(modalShowCountries(false))}
                data-cy-button="country-switch-modal"
                type="button"
              >
                <FooterCountryIconStyle aria-hidden focusable="false" />
                <> </>
                {i18n.t('main_footer.country')}
              </FooterItemAltLinkStyle>
            </FooterItemStyle>
            <FooterItemStyle>
              <FooterItemAltLinkStyle
                onClick={scrollToTop}
                to={getContactPageLink(country, language)}
              >
                <FooterContactIconStyle aria-hidden focusable="false" />
                <> </>
                {i18n.t('main_footer.contact')}
              </FooterItemAltLinkStyle>
            </FooterItemStyle>
          </FooterWrapperThirdListStyle>
        </ColumnToRowElementStyle>
      </FooterNavStyle>
    </FooterStyle>
  ) : (
    <></>
  );
};
