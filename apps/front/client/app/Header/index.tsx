import React from 'react';
import i18n from 'i18next';
import { trackClickMakeLogo } from '@make.org/utils/services/Tracking';
import { HeaderAuthentication } from '@make.org/components/Auth/Header';
import { NAVIGATION, PANEL, SEARCH, IDS } from '@make.org/types/enums';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { useParams } from 'react-router';
import { QuestionType } from '@make.org/types/Question';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
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
  HeaderCobrandingIcon,
  HeaderCobrandingSearchAnimation,
  HeaderCobrandingImage,
} from './style';

/**
 * Renders Main Header
 */

// @todo commented out code is for cobrandingLogo, will have to see if we completely delete or if it might still be used
export const Header: React.FC = () => {
  const { state } = useAppContext();
  const { country, device } = state.appConfig;
  const isDesktop = matchDesktopDevice(device);

  const params: {
    questionSlug: string;
  } = useParams();
  const { questionSlug } = params;

  const currentQuestion: QuestionType = selectCurrentQuestion(state);
  const cobrandingLogo = currentQuestion?.cobrandingLogo;

  const showDesktopMenu = () => {
    if (!questionSlug) {
      return true;
    }
    if (currentQuestion && !cobrandingLogo) {
      return true;
    }

    return false;
  };

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
          {questionSlug && cobrandingLogo && (
            <>
              <HeaderCobrandingIcon>
                <HeaderCobrandingImage
                  src={cobrandingLogo}
                  alt={currentQuestion?.cobrandingLogoAlt || ''}
                  height={32}
                  crop
                />
              </HeaderCobrandingIcon>
              <ScreenReaderItemStyle>
                {currentQuestion?.cobrandingLogoAlt || ''}
              </ScreenReaderItemStyle>
              <HeaderCobrandingSearchAnimation
                className={`${SEARCH.SEARCH_DESKTOP_EXPANDED}`}
              />
            </>
          )}
          {isDesktop && !!country && showDesktopMenu() && <DesktopMenu />}
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
