/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect, FC } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { PersonalityService } from '@make.org/utils/services/Personality';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { Redirect } from 'react-router';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { getRouteProfileEdit } from '@make.org/utils/routes';
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
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { PersonalityProfileType, PersonalityType } from '@make.org/types';
import { UserProfileSkipLinks } from '../../app/SkipLinks/Profile';
import { EditProfileLink } from '../../app/Profile/UserInformations/Navigation';
import { UserInformations } from '../../app/Profile/UserInformations';
import { Opinions } from '../../app/Opinions';

const ProfilePage: FC = () => {
  const { state } = useAppContext();
  const { user } = selectAuthentication(state);
  const { country } = state.appConfig;
  const [personality, setPersonality] = useState<
    | (PersonalityType & {
        profile: PersonalityProfileType;
      })
    | null
  >(null);
  const [loadPersonality, setLoadPersonality] = useState(true);

  const fetchPersonality = async () => {
    if (!user) {
      return null;
    }
    const personalityResponse = await PersonalityService.getPersonalityById(
      user.userId
    );

    setPersonality(personalityResponse);
    return setLoadPersonality(false);
  };

  useEffect(() => {
    fetchPersonality();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) {
    return <Redirect to={getHomeLink(country)} />;
  }

  const NavigationBar = <EditProfileLink link={getRouteProfileEdit(country)} />;

  return (
    <>
      <UserProfileSkipLinks />
      <MetaTags />
      <ProfileHeaderStyle aria-hidden />
      <ProfilePageContentWrapperStyle>
        <ProfilePageSidebarWrapperStyle>
          <ProfilePageSidebarStyle id="sidebar_content">
            {/* @ts-ignore */}
            <UserInformations user={user} navigationBar={NavigationBar} />
          </ProfilePageSidebarStyle>
        </ProfilePageSidebarWrapperStyle>
        <ProfilePageContentStyle>
          <TabNavStyle
            aria-label={i18n.t('common.secondary_nav')}
            id="organisation_nav"
          >
            <TabListStyle as="div">
              <TabStyle as="div" isSelected>
                <span>{i18n.t('personality.tabs.top_ideas')}</span>
              </TabStyle>
            </TabListStyle>
          </TabNavStyle>
          {loadPersonality ? (
            <Spinner />
          ) : (
            <>
              {/* @ts-ignore */}
              <Opinions personality={personality} privateProfile />
            </>
          )}
        </ProfilePageContentStyle>
      </ProfilePageContentWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default ProfilePage; // eslint-disable-line import/no-default-export
