import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { logout } from '@make.org/store/actions/authentication';
import {
  CommonUsersProfileType,
  OrganisationType,
  PersonalityType,
  UserType,
} from '@make.org/types';
import i18n from 'i18next';
import { getAgeFromDateOfBirth } from '@make.org/utils/helpers/date';
import { Avatar } from '@make.org/ui/components/Avatar';
import {
  AngleArrowLeftIconStyle,
  PencilIconStyle,
  SignOutIconStyle,
} from '@make.org/ui/elements/SvgElements';
import {
  ProfileAvatarStyle,
  ProfileContentWrapperStyle,
  ProfileTitleStyle,
  ProfileContentStyle,
  ProfileAvatarLayoutStyle,
  ProfileInformationButtonStyle,
  ProfileNavigationStyle,
  ProfileAlignLeftContentStyle,
  ProfileWebsiteLinkStyle,
  ProfileLinkIconStyle,
  ProfileMapIconStyle,
  ProfilePageSidebarWrapperStyle,
  ProfilePageSidebarStyle,
} from '@make.org/ui/elements/ProfileElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { USER } from '@make.org/types/enums';

import { CertifiedIconStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import {
  formatUserName,
  formatOrganisationName,
} from '@make.org/utils/helpers/stringFormatter';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { LinkAsGreyButton } from '@make.org/ui/elements/LinkElements';
import { Link } from 'react-router-dom';
import { getRouteProfile, getRouteProfileEdit } from '@make.org/utils/routes';
import { UserDescription } from './Description';

type Props = {
  user: (UserType | PersonalityType | OrganisationType) & {
    profile: CommonUsersProfileType;
  };
  getBack?: boolean;
};

export const UserInformations: FC<Props> = ({ user, getBack }) => {
  const { state, dispatch } = useAppContext();
  const { device, country } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const isOrganisation = user.userType === USER.TYPE_ORGANISATION;
  const isPersonality = user.userType === USER.TYPE_PERSONALITY;
  const isBasicUser = user.userType === USER.TYPE_USER;

  const { avatarUrl, email } = user;
  const {
    firstName = '',
    lastName = '',
    postalCode = '',
    dateOfBirth,
    profession = '',
    description,
    website,
  } = user.profile;

  return (
    <ProfilePageSidebarWrapperStyle id="sidebar_content">
      <ProfilePageSidebarStyle>
        <ProfileAvatarLayoutStyle>
          <ScreenReaderItemStyle as="h2">
            {i18n.t('profile.common.infos')}
          </ScreenReaderItemStyle>
          <ProfileAvatarStyle avatarSize={isMobile ? 120 : 160}>
            <Avatar avatarSize={isMobile ? 120 : 160} avatarUrl={avatarUrl} />
          </ProfileAvatarStyle>
          {isOrganisation && (
            <ProfileContentWrapperStyle>
              <ProfileTitleStyle>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.organisation')}
                </ScreenReaderItemStyle>
                {formatOrganisationName(
                  'displayName' in user ? user.displayName : ''
                )}
                <CertifiedIconStyle aria-hidden focusable="false" />
              </ProfileTitleStyle>
            </ProfileContentWrapperStyle>
          )}
          <ProfileContentWrapperStyle>
            {!isOrganisation && (
              <>
                <ProfileTitleStyle>
                  <ScreenReaderItemStyle>
                    {i18n.t('profile.common.labels.firstname')}
                  </ScreenReaderItemStyle>
                  {formatUserName(firstName)}
                  &nbsp;
                  {isPersonality && (
                    <>
                      <ScreenReaderItemStyle>
                        {i18n.t('profile.common.labels.lastname')}
                      </ScreenReaderItemStyle>
                      {formatUserName(lastName)}
                      <CertifiedIconStyle aria-hidden focusable="false" />
                    </>
                  )}
                </ProfileTitleStyle>
                <ProfileContentStyle>
                  <ScreenReaderItemStyle>
                    {i18n.t('profile.common.labels.email')}
                  </ScreenReaderItemStyle>
                  {email}
                </ProfileContentStyle>
              </>
            )}
            {'politicalParty' in user.profile && (
              <ProfileContentStyle>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.political_party')}
                </ScreenReaderItemStyle>
                {user.profile.politicalParty}
              </ProfileContentStyle>
            )}
            {postalCode && (
              <ProfileContentStyle>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.postal_code')}
                </ScreenReaderItemStyle>
                <ProfileMapIconStyle aria-hidden focusable="false" />
                {postalCode}
              </ProfileContentStyle>
            )}
            {dateOfBirth && (
              <ProfileContentStyle>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.age')}
                </ScreenReaderItemStyle>
                {i18n.t('profile.common.age', {
                  age: getAgeFromDateOfBirth(dateOfBirth),
                })}
              </ProfileContentStyle>
            )}
            {profession && (
              <ProfileContentStyle>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.profession')}
                </ScreenReaderItemStyle>
                {profession}
              </ProfileContentStyle>
            )}
          </ProfileContentWrapperStyle>
        </ProfileAvatarLayoutStyle>
        {description && (
          <>
            <ScreenReaderItemStyle>
              {i18n.t('profile.common.labels.biography')}
            </ScreenReaderItemStyle>
            <UserDescription description={description} />
          </>
        )}
        {!isBasicUser && website && (
          <ProfileAlignLeftContentStyle>
            <ScreenReaderItemStyle>
              {i18n.t('profile.common.labels.website')}
            </ScreenReaderItemStyle>
            <ProfileLinkIconStyle aria-hidden focusable="false" />
            <ProfileWebsiteLinkStyle
              as="a"
              target="_blank"
              rel="noopener"
              href={website}
            >
              {website}
            </ProfileWebsiteLinkStyle>
          </ProfileAlignLeftContentStyle>
        )}
        <ProfileNavigationStyle>
          {getBack ? (
            <LinkAsGreyButton to={getRouteProfile(country)} as={Link}>
              <AngleArrowLeftIconStyle aria-hidden focusable="false" />
              <>{i18n.t('profile.informations_update.link_to_profile')}</>
            </LinkAsGreyButton>
          ) : (
            <LinkAsGreyButton to={getRouteProfileEdit(country)} as={Link}>
              <PencilIconStyle aria-hidden focusable="false" />
              <>{i18n.t('profile.informations_update.title')}</>
            </LinkAsGreyButton>
          )}
          <ProfileInformationButtonStyle
            onClick={() => dispatch(logout(dispatch))}
          >
            <SignOutIconStyle aria-hidden focusable="false" />
            {i18n.t('profile.common.log_out')}
          </ProfileInformationButtonStyle>
        </ProfileNavigationStyle>
      </ProfilePageSidebarStyle>
    </ProfilePageSidebarWrapperStyle>
  );
};
