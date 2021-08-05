/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react';
import { generatePath, Link, Redirect } from 'react-router-dom';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { getRouteProfile, ROUTE_PROFILE_EDIT } from '@make.org/utils/routes';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  ProfileHeaderStyle,
  ProfilePageContentStyle,
  ProfilePageContentWrapperStyle,
  ProfilePageSidebarStyle,
  ProfilePageSidebarWrapperStyle,
} from '@make.org/ui/elements/ProfileElements';
import {
  TabListStyle,
  TabNavStyle,
  TabStyle,
} from '@make.org/ui/elements/TabsElements';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { UpdateNewsletter } from '../../app/Profile/UpdateNewsletter';
import { GoToProfileLink } from '../../app/Profile/UserInformations/Navigation';
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

  const NavigationBar = <GoToProfileLink link={getRouteProfile(country)} />;

  return (
    <>
      <MetaTags title={i18n.t('meta.profile.edit.title')} />
      <ProfileHeaderStyle aria-hidden />
      <ProfilePageContentWrapperStyle>
        <ProfilePageSidebarWrapperStyle>
          <ProfilePageSidebarStyle>
            {/* @ts-ignore */}
            <UserInformations user={user} navigationBar={NavigationBar} />
          </ProfilePageSidebarStyle>
        </ProfilePageSidebarWrapperStyle>
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
          {/* @ts-ignore */}
          <UpdateInformations user={user} />
          {/* @ts-ignore */}
          <UpdatePassword userId={user.userId} hasPassword={user.hasPassword} />
          <UpdateNewsletter
            userId={user.userId}
            userType={user.userType}
            profile={user.profile}
          />
          {/* @ts-ignore */}
          <DeleteAccount user={user} />
        </ProfilePageContentStyle>
      </ProfilePageContentWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default ProfileEditPage; // eslint-disable-line import/no-default-export
