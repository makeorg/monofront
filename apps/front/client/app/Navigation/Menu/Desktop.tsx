/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, FC, useState, useRef } from 'react';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import i18n from 'i18next';
import {
  getWebflowDynamicLink,
  getNewsLinkByCountry,
} from '@make.org/utils/helpers/url';
import useOnClickOutside from '@make.org/utils/hooks/useOnClickOutside';
import { unlockBody } from '@make.org/utils/helpers/styled';
import { removeAriaHiddenByClass } from '@make.org/utils/helpers/a11y';
import { NAVIGATION, SEARCH } from '@make.org/types/enums';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';

import {
  ROUTE_PARTNERSHIP,
  ROUTE_WHOAREWE,
  ROUTE_JOIN_GREAT_CAUSE,
} from '@make.org/utils/routes';
import { useAppContext } from '@make.org/store';
import {
  DesktopMenuNavStyle,
  DesktopMenuItemStyle,
  MenuNewWindowIconStyle,
  DesktopMenuExternalLinkStyle,
  DesktopMenuDropdownButtonStyle,
  MenuDropdownListStyle,
  MenuDropdownItemListLinkStyle,
} from './style';

export const DesktopMenu: FC = () => {
  const { state } = useAppContext();
  const { country, language } = state.appConfig;
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
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
        <DesktopMenuItemStyle className="with-border">
          <DesktopMenuExternalLinkStyle
            target="_blank"
            rel="noopener"
            href={getNewsLinkByCountry(country)}
          >
            {i18n.t('main_footer.news')}
            <> </>
            {externalLinkIcon}
          </DesktopMenuExternalLinkStyle>
        </DesktopMenuItemStyle>

        <DesktopMenuItemStyle
          className={`${SEARCH.SEARCH_DESKTOP_EXPANDED} with-border`}
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
                    href={getWebflowDynamicLink('fr', ROUTE_JOIN_GREAT_CAUSE)}
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
