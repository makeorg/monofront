/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect, FC } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { PersonalityService } from '@make.org/utils/services/Personality';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { Redirect } from 'react-router';
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
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import {
  CommonUsersProfileType,
  OrganisationType,
  PersonalityProfileType,
  PersonalityType,
  UserType,
} from '@make.org/types';
import { UserProfileSkipLinks } from '../../app/SkipLinks/Profile';
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

  const formattedUserType = user as (
    | UserType
    | PersonalityType
    | OrganisationType
  ) & {
    profile: CommonUsersProfileType;
  };

  return (
    <>
      <UserProfileSkipLinks />
      <MetaTags />
      <ProfileHeaderStyle aria-hidden />
      <ProfilePageContentWrapperStyle>
        <UserInformations user={formattedUserType} />
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
