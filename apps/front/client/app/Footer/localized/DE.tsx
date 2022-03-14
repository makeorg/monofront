import React from 'react';
import i18n from 'i18next';
import { ColumnToRowElementStyle } from '@make.org/ui/elements/FlexElements';
import {
  getA11YPageLink,
  getContactPageLink,
  getCookiesPageLink,
} from '@make.org/utils/helpers/url';
import {
  matchDesktopDevice,
  scrollToTop,
} from '@make.org/utils/helpers/styled';
import { NAVIGATION, PANEL, IDS, URL } from '@make.org/types/enums';

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
  FooterWrapperFirstListStyle,
  FooterItemHTMLLinkStyle,
  FooterSeparatorStyle,
} from '../style';
import { FooterCommonLinks } from '../CommonLinks';
import { FooterExternalLink } from '../ExternalLink';

/**
 * Renders Main Footer
 */
export const FooterDE: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const location = useLocation();
  const { country, language, device } = state.appConfig;
  const isSequencePage = getIsSequencePage(location.pathname);
  const isDesktop = matchDesktopDevice(device);

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
          <FooterWrapperFirstListStyle>
            {isDesktop && (
              <FooterItemStyle>
                <FooterItemHTMLLinkStyle
                  target="_blank"
                  rel="noopener"
                  href={URL.JOBS_LINK_DE}
                >
                  {i18n.t('main_footer.jobs')}
                  <> </>
                  <FooterExternalLink />
                </FooterItemHTMLLinkStyle>
              </FooterItemStyle>
            )}
          </FooterWrapperFirstListStyle>
          <FooterWrapperThirdListStyle as="div">
            <FooterItemStyle as="div">
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
        <FooterSeparatorStyle />
        <ColumnToRowElementStyle>
          <FooterWrapperSecondListStyle>
            <FooterCommonLinks />
            <FooterItemStyle>
              <FooterItemLinkStyle
                onClick={scrollToTop}
                to={getA11YPageLink(country, language)}
              >
                {i18n.t('main_footer.a11y')}
              </FooterItemLinkStyle>
            </FooterItemStyle>
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
            <FooterItemStyle as="div">
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
          </FooterWrapperThirdListStyle>
        </ColumnToRowElementStyle>
      </FooterNavStyle>
    </FooterStyle>
  ) : (
    <></>
  );
};
