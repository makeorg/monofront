import React, { useEffect, FC } from 'react';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import i18n from 'i18next';
import {
  getBrowseConsultationsLink,
  getWebflowDynamicLink,
} from '@make.org/utils/helpers/url';
import { scrollToTop, unlockBody } from '@make.org/utils/helpers/styled';
import { removeAriaHiddenByClass } from '@make.org/utils/helpers/a11y';
import {
  NAVIGATION_ELEMENT_ARIA_CLASS,
  NAVIGATION_ARIA_CLASS,
  SEARCH_DESKTOP_EXPANDED,
} from '@make.org/utils/constants/a11y';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { getCountryWithConsultations } from '@make.org/utils/helpers/countries';
import { ROUTE_PARTNERSHIP, ROUTE_WHOAREWE } from '../../../../shared/routes';
import {
  DesktopMenuNavStyle,
  DesktopMenuItemStyle,
  DesktopMenuInternalLinkStyle,
  MenuNewWindowIconStyle,
  DesktopMenuExternalLinkStyle,
} from './style';
import { useAppContext } from '../../../../../../store';

export const DesktopMenu: FC = () => {
  const { state } = useAppContext();
  const { country, language, countriesWithConsultations } = state.appConfig;
  const browseConsultationsLink = getBrowseConsultationsLink(country);
  const isFR = country === 'FR';
  const countryHasConsultations = getCountryWithConsultations(
    country,
    countriesWithConsultations
  );

  useEffect(() => {
    removeAriaHiddenByClass(NAVIGATION_ARIA_CLASS);
    removeAriaHiddenByClass(NAVIGATION_ELEMENT_ARIA_CLASS);
    unlockBody();
  }, []);

  const externalLinkIcon = (
    <>
      <MenuNewWindowIconStyle aria-hidden focusable="false" />
      <ScreenReaderItemStyle>
        {i18n.t('common.open_new_window')}
      </ScreenReaderItemStyle>
    </>
  );

  return (
    <DesktopMenuNavStyle aria-label={i18n.t('header.main_navigation')}>
      <UnstyledListStyle>
        {countryHasConsultations && (
          <DesktopMenuItemStyle className="with-border">
            <DesktopMenuInternalLinkStyle
              to={browseConsultationsLink}
              onClick={scrollToTop}
            >
              {i18n.t('browse.page_title')}
            </DesktopMenuInternalLinkStyle>
          </DesktopMenuItemStyle>
        )}
        <DesktopMenuItemStyle
          className={`${SEARCH_DESKTOP_EXPANDED} with-border`}
        >
          <DesktopMenuExternalLinkStyle
            target="_blank"
            rel="noopener"
            href={getWebflowDynamicLink(language, ROUTE_WHOAREWE)}
          >
            {i18n.t('main_footer.whoarewe')}
            <> </>
            {externalLinkIcon}
          </DesktopMenuExternalLinkStyle>
        </DesktopMenuItemStyle>
        {isFR && (
          <DesktopMenuItemStyle
            className={`${SEARCH_DESKTOP_EXPANDED} with-border`}
          >
            <DesktopMenuExternalLinkStyle
              target="_blank"
              rel="noopener"
              href={getWebflowDynamicLink(language, ROUTE_PARTNERSHIP)}
            >
              {i18n.t('homepage.partnership.subtitle')}
              <> </>
              {externalLinkIcon}
            </DesktopMenuExternalLinkStyle>
          </DesktopMenuItemStyle>
        )}
      </UnstyledListStyle>
    </DesktopMenuNavStyle>
  );
};
