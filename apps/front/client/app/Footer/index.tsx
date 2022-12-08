/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { ColumnToRowElementStyle } from '@make.org/ui/elements/FlexElements';
import { getContactPageLink } from '@make.org/utils/helpers/url';
import {
  matchDesktopDevice,
  scrollToTop,
} from '@make.org/utils/helpers/styled';
import { NAVIGATION, PANEL, IDS } from '@make.org/types/enums';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { setPanelContent } from '@make.org/store/actions/panel';
import { isSequencePage as getIsSequencePage } from '@make.org/utils/routes';
import { useLocation } from 'react-router';
import { useAppContext } from '@make.org/store';
import { getCountriesTransMap } from '@make.org/front/client/helpers/translationsMap';
import { SwitchCountryLanguage } from '../SwitchCountryLanguage';
import { FooterExternalLink } from './ExternalLink';
import {
  useExternalLinks,
  useInternalLinks,
} from '../../hooks/useLocalizedFooter';
import {
  FooterStyle,
  FooterNavStyle,
  FooterItemStyle,
  FooterSeparatorStyle,
  FooterWrapperFirstListStyle,
  FooterWrapperSecondListStyle,
  FooterWrapperThirdListStyle,
  FooterItemAltLinkStyle,
  FooterCountryIconStyle,
  FooterContactIconStyle,
  FooterBulletPointStyle,
} from './style';
import { FooterInternalLink } from './InternalLink';

/**
 * Renders Main Footer
 */
export const Footer: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const location = useLocation();
  const { country, device, language } = state.appConfig;
  const [countriesTransMap, setCountriesTransMap] = useState(
    getCountriesTransMap()
  );
  const isDesktop = matchDesktopDevice(device);
  const isSequencePage = getIsSequencePage(location.pathname);
  const externalLinks = useExternalLinks(country, language, isDesktop);
  const internalLinks = useInternalLinks(country, language);

  useEffect(() => {
    setCountriesTransMap(getCountriesTransMap());
  }, [country, language]);

  if (!country) {
    return null;
  }

  return (
    <FooterStyle
      id={IDS.MAIN_FOOTER}
      className={`${NAVIGATION.NAVIGATION_ARIA_NEGATIVE_TAB_CLASS} ${
        PANEL.PANEL_ARIA_NEGATIVE_TAB_CLASS
      } ${isSequencePage && 'extra-mobile-padding-bottom'}`}
      data-cy-container="footer"
    >
      <FooterNavStyle aria-label={i18n.t('common.footer_nav') || undefined}>
        <ColumnToRowElementStyle>
          <FooterWrapperFirstListStyle>
            {externalLinks.map(externalLink =>
              externalLink.isDesktop ? (
                isDesktop && (
                  <FooterExternalLink
                    key={externalLink.url}
                    externalLink={externalLink}
                  />
                )
              ) : (
                <FooterExternalLink
                  key={externalLink.url}
                  externalLink={externalLink}
                />
              )
            )}
          </FooterWrapperFirstListStyle>
          <FooterWrapperThirdListStyle as="div">
            <FooterItemStyle as="div">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore: remove after upgrade to react18 */}
              <FooterItemAltLinkStyle
                onClick={scrollToTop}
                to={getContactPageLink(country)}
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
            {internalLinks.map(internalLink => (
              <FooterInternalLink
                key={internalLink.url}
                internalLink={internalLink}
              />
            ))}
          </FooterWrapperSecondListStyle>
          <FooterWrapperThirdListStyle as="div">
            <FooterItemStyle as="div">
              <FooterItemAltLinkStyle
                as={UnstyledButtonStyle}
                onClick={() =>
                  dispatch(setPanelContent(<SwitchCountryLanguage />))
                }
                data-cy-button="country-language-switch-panel"
                type="button"
              >
                <FooterCountryIconStyle aria-hidden focusable="false" />
                <> </>
                {countriesTransMap.get(country)}
                <FooterBulletPointStyle>
                  &nbsp;{`\u2022`}&nbsp;
                </FooterBulletPointStyle>
                {language.charAt(0).toUpperCase() + language.slice(1)}
              </FooterItemAltLinkStyle>
            </FooterItemStyle>
          </FooterWrapperThirdListStyle>
        </ColumnToRowElementStyle>
      </FooterNavStyle>
    </FooterStyle>
  );
};
