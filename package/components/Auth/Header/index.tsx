import React from 'react';
import { trackClickProfile } from '@make.org/utils/services/Tracking';
import { Avatar } from '@make.org/ui/components/Avatar';
import { USER, SEARCH } from '@make.org/types/enums';
import {
  formatOrganisationName,
  formatUserName,
} from '@make.org/utils/helpers/stringFormatter';
import { getRouteProfile } from '@make.org/utils/routes';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { SvgUser } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import { setPanelContent } from '@make.org/store/actions/panel';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { Login } from '../Login';
import { ProfileLinkStyle } from './style';

export const HeaderAuthentication: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { user } = state.user.authentication;
  const { country, device } = state.appConfig;
  const isDesktop = matchDesktopDevice(device);

  if (user) {
    const isOrganisation = user.userType === USER.TYPE_ORGANISATION;
    const userName = isOrganisation
      ? formatOrganisationName('displayName' in user ? user.displayName : '')
      : formatUserName('displayName' in user ? user.displayName : '');

    return (
      <ProfileLinkStyle
        className={SEARCH.SEARCH_ELEMENT_ARIA_CLASS}
        to={getRouteProfile(country)}
        onClick={trackClickProfile}
        aria-label={i18n.t('common.header_authentication_nav') || undefined}
        data-cy-link="header-profile"
      >
        <Avatar avatarUrl={user.avatarUrl} />
        {isDesktop && userName}
      </ProfileLinkStyle>
    );
  }

  return (
    <ProfileLinkStyle
      className={SEARCH.SEARCH_ELEMENT_ARIA_CLASS}
      as={UnstyledButtonStyle}
      onClick={() => dispatch(setPanelContent(<Login />))}
      data-cy-button="login"
      type="button"
    >
      {!isDesktop ? (
        <>
          <SvgUser focusable="false" aria-hidden />
          <ScreenReaderItemStyle>
            {i18n.t('common.connexion_label')}
          </ScreenReaderItemStyle>
        </>
      ) : (
        i18n.t('common.connexion_label')
      )}
    </ProfileLinkStyle>
  );
};
