import React from 'react';
import i18n from 'i18next';
import { trackClickBlog } from '@make.org/utils/services/Tracking';
import { ColumnToRowElementStyle } from '@make.org/ui/elements/FlexElements';
import {
  JOBS_LINK,
  NEWS_LINK,
  DOTATION_FUNDS_LINK,
  PRESS_DETAILS_LINK,
} from '@make.org/utils/constants/url';
import {
  getContactPageLink,
  getA11YPageLink,
  getCookiesPageLink,
} from '@make.org/utils/helpers/url';
import {
  matchDesktopDevice,
  scrollToTop,
} from '@make.org/utils/helpers/styled';
import {
  NAVIGATION_ARIA_NEGATIVE_TAB_CLASS,
  PANEL_ARIA_NEGATIVE_TAB_CLASS,
} from '@make.org/utils/constants/a11y';
import { MAIN_FOOTER } from '@make.org/utils/constants/ids';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { modalShowCountries } from '@make.org/store/actions/modal';
import { isSequencePage as getIsSequencePage } from '@make.org/utils/routes';
import { useLocation } from 'react-router';
import { useAppContext } from '@make.org/store';
import { FooterExternalLink } from '../ExternalLink';
import {
  FooterStyle,
  FooterNavStyle,
  FooterItemStyle,
  FooterItemLinkStyle,
  FooterSeparatorStyle,
  FooterWrapperFirstListStyle,
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
export const FooterFR: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const location = useLocation();
  const { country, device, language } = state.appConfig;
  const isDesktop = matchDesktopDevice(device);
  const isSequencePage = getIsSequencePage(location.pathname);

  return (
    <FooterStyle
      id={MAIN_FOOTER}
      className={`${NAVIGATION_ARIA_NEGATIVE_TAB_CLASS} ${PANEL_ARIA_NEGATIVE_TAB_CLASS} ${
        isSequencePage && 'extra-mobile-padding-bottom'
      }`}
      data-cy-container="footer"
    >
      <FooterNavStyle aria-label={i18n.t('common.footer_nav')}>
        <ColumnToRowElementStyle>
          <FooterWrapperFirstListStyle>
            {isDesktop && (
              <FooterItemStyle>
                <FooterItemLinkStyle
                  as="a"
                  target="_blank"
                  rel="noopener"
                  href={NEWS_LINK}
                  onClick={() => trackClickBlog('blog list')}
                >
                  {i18n.t('main_footer.news')}
                  <> </>
                  <FooterExternalLink />
                </FooterItemLinkStyle>
              </FooterItemStyle>
            )}
            <FooterItemStyle>
              <FooterItemLinkStyle
                as="a"
                target="_blank"
                rel="noopener"
                href={PRESS_DETAILS_LINK}
              >
                {i18n.t('main_footer.press_details')}
                <> </>
                <FooterExternalLink />
              </FooterItemLinkStyle>
            </FooterItemStyle>
            {isDesktop && (
              <FooterItemStyle>
                <FooterItemLinkStyle
                  as="a"
                  target="_blank"
                  rel="noopener"
                  href={JOBS_LINK}
                >
                  {i18n.t('main_footer.jobs')}
                  <> </>
                  <FooterExternalLink />
                </FooterItemLinkStyle>
              </FooterItemStyle>
            )}
            <FooterItemStyle>
              <FooterItemLinkStyle
                as="a"
                target="_blank"
                rel="noopener"
                href={DOTATION_FUNDS_LINK}
              >
                {i18n.t('main_footer.dotation_funds')}
                <> </>
                <FooterExternalLink />
              </FooterItemLinkStyle>
            </FooterItemStyle>
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
          <FooterWrapperThirdListStyle as="div">
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
  );
};
