/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react';
import { generatePath, Link, Redirect } from 'react-router-dom';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { ROUTE_PROFILE_EDIT } from '@make.org/utils/routes';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  ProfileHeaderStyle,
  ProfilePageContentStyle,
  ProfilePageContentWrapperStyle,
} from '@make.org/ui/elements/ProfileElements';
import {
  TabListStyle,
  TabNavStyle,
  TabStyle,
} from '@make.org/ui/elements/TabsElements';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import {
  CommonUsersProfileType,
  OrganisationType,
  PersonalityType,
  UserType,
} from '@make.org/types';
import { UpdateNewsletter } from '../../app/Profile/UpdateNewsletter';
import { UserInformations } from '../../app/Profile/UserInformations';
import { UpdateInformations } from '../../app/Profile/UpdateInformations';
import { UpdatePassword } from '../../app/Profile/UpdatePassword';
import { DeleteAccount } from '../../app/Profile/DeleteAccount';

const ProfileEditPage: FC = () => {
  const { state } = useAppContext();
  const { user } = selectAuthentication(state);
  const { country, language } = state.appConfig;
  const editProfileLink = generatePath(ROUTE_PROFILE_EDIT, {
    country,
    language,
  });

  if (!user) {
    return <Redirect to={getHomeLink(country)} />;
  }

  const formattedUserMultipleType = user as (
    | UserType
    | PersonalityType
    | OrganisationType
  ) & {
    profile: CommonUsersProfileType;
  };

  const formattedUserType = user as UserType & {
    profile: CommonUsersProfileType;
  };

  return (
    <>
      <MetaTags title={i18n.t('meta.profile.edit.title')} />
      <ProfileHeaderStyle aria-hidden />
      <ProfilePageContentWrapperStyle>
        <UserInformations user={formattedUserMultipleType} getBack />
        <ProfilePageContentStyle>
          <TabNavStyle aria-label={i18n.t('common.secondary_nav')}>
            <TabListStyle as="div">
              <TabStyle as="div" isSelected>
                <Link to={editProfileLink}>
                  {i18n.t('profile.tabs.manage_account')}
                </Link>
              </TabStyle>
            </TabListStyle>
          </TabNavStyle>
          <UpdateInformations user={formattedUserType} />
          <UpdatePassword
            userId={user.userId}
            hasPassword={formattedUserType.hasPassword}
          />
          <UpdateNewsletter
            userId={user.userId}
            userType={user.userType}
            profile={user.profile}
          />
          <DeleteAccount user={formattedUserType} />
        </ProfilePageContentStyle>
      </ProfilePageContentWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default ProfileEditPage; // eslint-disable-line import/no-default-export
