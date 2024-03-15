/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, FC, useState, useRef } from 'react';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import i18n from 'i18next';
import {
  getBrowseConsultationsLink,
  getWhoAreWeDynamicLink,
  getWebflowDynamicLink,
  getWebflowGreatCauseLink,
} from '@make.org/utils/helpers/url';
import useOnClickOutside from '@make.org/utils/hooks/useOnClickOutside';
import { scrollToTop, unlockBody } from '@make.org/utils/helpers/styled';
import { removeAriaHiddenByClass } from '@make.org/utils/helpers/a11y';
import { NAVIGATION, SEARCH } from '@make.org/types/enums';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { getCountryWithConsultations } from '@make.org/utils/helpers/countries';
import {
  ROUTE_PARTNERSHIP,
  ROUTE_WHOAREWE,
  ROUTE_JOIN_GREAT_CAUSE,
} from '@make.org/utils/routes';
import { useAppContext } from '@make.org/store';
import {
  DesktopMenuNavStyle,
  DesktopMenuItemStyle,
  DesktopMenuInternalLinkStyle,
  MenuNewWindowIconStyle,
  DesktopMenuExternalLinkStyle,
  DesktopMenuDropdownButtonStyle,
  MenuDropdownListStyle,
  MenuDropdownItemListLinkStyle,
} from './style';

export const DesktopMenu: FC = () => {
  const { state } = useAppContext();
  const { country, language, countriesWithConsultations } = state.appConfig;
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const browseConsultationsLink = getBrowseConsultationsLink(country);
  const countryHasConsultations = getCountryWithConsultations(
    country,
    countriesWithConsultations
  );
  const isFR = country === 'FR';
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    removeAriaHiddenByClass(NAVIGATION.NAVIGATION_ARIA_CLASS);
    removeAriaHiddenByClass(NAVIGATION.NAVIGATION_ELEMENT_ARIA_CLASS);
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

  const handleClickOutside = () => {
    if (openDropdown) {
      setOpenDropdown(false);
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <DesktopMenuNavStyle
      aria-label={i18n.t('header.main_navigation') || undefined}
    >
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
          className={`${SEARCH.SEARCH_DESKTOP_EXPANDED} with-border`}
        >
          <DesktopMenuExternalLinkStyle
            target="_blank"
            rel="noopener"
            href={getWhoAreWeDynamicLink(language, ROUTE_WHOAREWE)}
          >
            {i18n.t('main_footer.whoarewe')}
            <> </>
            {externalLinkIcon}
          </DesktopMenuExternalLinkStyle>
        </DesktopMenuItemStyle>

        {isFR ? (
          <DesktopMenuItemStyle
            className={`${SEARCH.SEARCH_DESKTOP_EXPANDED} with-border dropdown`}
            ref={ref}
          >
            <DesktopMenuDropdownButtonStyle
              aria-expanded={openDropdown}
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              {i18n.t('homepage.partnership.collaborate')}
            </DesktopMenuDropdownButtonStyle>
            {openDropdown && (
              <MenuDropdownListStyle>
                <li>
                  <MenuDropdownItemListLinkStyle
                    href={getWebflowDynamicLink(language, ROUTE_PARTNERSHIP)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {i18n.t('homepage.partnership.start_project')}
                    <> </>
                    {externalLinkIcon}
                  </MenuDropdownItemListLinkStyle>
                </li>
                <li>
                  <MenuDropdownItemListLinkStyle
                    href={getWebflowGreatCauseLink(
                      'fr',
                      ROUTE_JOIN_GREAT_CAUSE
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {i18n.t('homepage.partnership.join')}
                    <> </>
                    {externalLinkIcon}
                  </MenuDropdownItemListLinkStyle>
                </li>
              </MenuDropdownListStyle>
            )}
          </DesktopMenuItemStyle>
        ) : (
          <DesktopMenuItemStyle
            className={`${SEARCH.SEARCH_DESKTOP_EXPANDED} with-border`}
          >
            <DesktopMenuExternalLinkStyle
              target="_blank"
              rel="noopener"
              href={getWebflowDynamicLink(language, ROUTE_PARTNERSHIP)}
            >
              {i18n.t('homepage.partnership.start_project')}
              <> </>
              {externalLinkIcon}
            </DesktopMenuExternalLinkStyle>
          </DesktopMenuItemStyle>
        )}
      </UnstyledListStyle>
    </DesktopMenuNavStyle>
  );
};
