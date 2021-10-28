/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react';
import { Switch, Route, Redirect, Link, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';
import i18n from 'i18next';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { useAppContext } from '@make.org/store';
import { USER } from '@make.org/types/enums';
import {
  getRouteProfileEdit,
  getRouteProfileFavourites,
  getRouteProfileOpinions,
  getRouteProfileProposals,
  isProfileFavourites,
  isProfileProposals,
  ROUTE_PROFILE_FAVOURITES,
  ROUTE_PROFILE_PROPOSALS,
} from '@make.org/utils/routes';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  ProfileHeaderStyle,
  ProfilePageContentStyle,
  ProfilePageContentWrapperStyle,
  ProfilePageSidebarStyle,
  ProfilePageSidebarWrapperStyle,
  ProfileTabIconStyle,
} from '@make.org/ui/elements/ProfileElements';
import {
  TabListStyle,
  TabNavStyle,
  TabStyle,
} from '@make.org/ui/elements/TabsElements';
import { EditProfileLink } from '../../app/Profile/UserInformations/Navigation';
import { UserProfileSkipLinks } from '../../app/SkipLinks/Profile';
import { UserInformations } from '../../app/Profile/UserInformations';

const ProfileProposalsPage = loadable(() => import('./Proposals'));
const ProfileFavouritesPage = loadable(() => import('./Favourites'));

const ProfilePage: FC = () => {
  const { state } = useAppContext();
  const { pathname } = useLocation();
  const { user } = selectAuthentication(state);
  const { country } = state.appConfig;
  const isPersonality = user && user.userType === USER.TYPE_PERSONALITY;

  const profileProposalsLink = getRouteProfileProposals(country);
  const profileFavouritesLink = getRouteProfileFavourites(country);
  const profileOpinions = getRouteProfileOpinions(country);
  const isProfileProposalsActive = isProfileProposals(pathname);
  const isProfileFavouritesActive = isProfileFavourites(pathname);

  if (!user) {
    return <Redirect to={getHomeLink(country)} />;
  }

  if (isPersonality) {
    return <Redirect to={profileOpinions} />;
  }

  const NavigationBar = <EditProfileLink link={getRouteProfileEdit(country)} />;

  return (
    <>
      <UserProfileSkipLinks />
      <MetaTags />
      <ProfileHeaderStyle />
      <ProfilePageContentWrapperStyle>
        <ProfilePageSidebarWrapperStyle id="sidebar_content">
          <ProfilePageSidebarStyle>
            {/* @ts-ignore */}
            <UserInformations user={user} navigationBar={NavigationBar} />
          </ProfilePageSidebarStyle>
        </ProfilePageSidebarWrapperStyle>
        <ProfilePageContentStyle>
          <TabNavStyle
            aria-label={i18n.t('common.secondary_nav')}
            id="profile_nav"
          >
            <TabListStyle>
              <TabStyle isSelected={isProfileProposalsActive}>
                <Link
                  to={profileProposalsLink}
                  aria-current={isProfileProposalsActive}
                >
                  {i18n.t('profile.tabs.proposals')}
                </Link>
              </TabStyle>
              <TabStyle isSelected={isProfileFavouritesActive}>
                <Link
                  to={profileFavouritesLink}
                  aria-current={isProfileFavouritesActive}
                  className="inline"
                >
                  {i18n.t('profile.tabs.favourites')}
                  <ProfileTabIconStyle aria-hidden focusable="false" />
                </Link>
              </TabStyle>
            </TabListStyle>
          </TabNavStyle>
          <Switch>
            <Route
              path={ROUTE_PROFILE_PROPOSALS}
              exact
              component={() => <ProfileProposalsPage user={user} />}
            />
            <Route
              path={ROUTE_PROFILE_FAVOURITES}
              exact
              component={() => <ProfileFavouritesPage user={user} />}
            />
          </Switch>
        </ProfilePageContentStyle>
      </ProfilePageContentWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default ProfilePage; // eslint-disable-line import/no-default-export
