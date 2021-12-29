import React from 'react';
import i18n from 'i18next';
import { trackClickMakeLogo } from '@make.org/utils/services/Tracking';
import { HeaderAuthentication } from '@make.org/components/Auth/Header';
import { NAVIGATION, PANEL, SEARCH, IDS } from '@make.org/types/enums';

import { getHomeLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { Logger } from '@make.org/utils/services/Logger';
import { DesktopMenu } from '../Navigation/Menu/Desktop';
import { MobileMenu } from '../Navigation/Menu/Mobile';
import { DesktopSearchInput } from '../Search/Form/Desktop';
import { MobileSearchInput } from '../Search/Form/Mobile';
import {
  HeaderStyle,
  HeaderInnerStyle,
  HeaderLogoLinkStyle,
  HeaderLogoStyle,
  HeaderFlexLeftStyle,
  HeaderFlexRightStyle,
  HeaderSeparatorStyle,
} from './style';

/**
 * Renders Main Header
 */
export const Header: React.FC = () => {
  const { state } = useAppContext();
  const { country, device } = state.appConfig;
  const isDesktop = matchDesktopDevice(device);

  return (
    <HeaderStyle
      id={IDS.MAIN_HEADER}
      className={PANEL.PANEL_ARIA_NEGATIVE_TAB_CLASS}
      data-cy-container="header"
    >
      <HeaderInnerStyle>
        {!isDesktop && <MobileMenu />}
        <HeaderFlexLeftStyle
          className={`${NAVIGATION.NAVIGATION_ELEMENT_ARIA_CLASS} ${SEARCH.SEARCH_ELEMENT_ARIA_CLASS}`}
        >
          <h1>
            <HeaderLogoLinkStyle
              to={getHomeLink(country)}
              onClick={
                country
                  ? trackClickMakeLogo
                  : () =>
                      Logger.logError({
                        name: 'header-component',
                        message: 'No country on Make.org logo',
                      })
              }
              data-cy-link="home"
            >
              <HeaderLogoStyle focusable="false" aria-hidden />
              <ScreenReaderItemStyle>
                {i18n.t('header.logo_alt')}
              </ScreenReaderItemStyle>
            </HeaderLogoLinkStyle>
          </h1>
          {isDesktop && !!country && <DesktopMenu />}
        </HeaderFlexLeftStyle>
        {!!country && (
          <HeaderFlexRightStyle
            className={NAVIGATION.NAVIGATION_ELEMENT_ARIA_CLASS}
          >
            {!isDesktop ? <MobileSearchInput /> : <DesktopSearchInput />}
            {isDesktop && <HeaderSeparatorStyle />}
            <HeaderAuthentication />
          </HeaderFlexRightStyle>
        )}
      </HeaderInnerStyle>
    </HeaderStyle>
  );
};
