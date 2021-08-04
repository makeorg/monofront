import React, { useEffect, useState, FC } from 'react';
import { Redirect, useParams, RouteComponentProps } from 'react-router';
import i18n from 'i18next';
import {
  TabNavStyle,
  TabListStyle,
  TabStyle,
} from '@make.org/ui/elements/TabsElements';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { MiddlePageWrapperStyle } from '@make.org/ui/elements/MainElements';
import {
  ProfileHeaderStyle,
  ProfilePageContentWrapperStyle,
  ProfilePageSidebarWrapperStyle,
  ProfilePageSidebarStyle,
  ProfileAvatarLayoutStyle,
  ProfileAvatarStyle,
  ProfileContentWrapperStyle,
  ProfileTitleStyle,
  ProfileAlignLeftContentStyle,
  ProfileWebsiteLinkStyle,
  ProfileContentStyle,
  ProfilePageContentStyle,
  ProfileLinkIconStyle,
} from '@make.org/ui/elements/ProfileElements';
import { Avatar } from '@make.org/ui/components/Avatar';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import { Sharing } from '@make.org/components/Sharing';
import { PersonalityService } from '@make.org/utils/services/Personality';
import { USER } from '@make.org/types/enums';
import { trackDisplayPublicProfile } from '@make.org/utils/services/Tracking';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { CertifiedIconStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import { useAppContext } from '@make.org/store';
import { PersonalityProfileType, PersonalityType } from '@make.org/types';
import { MetaTags } from '@make.org/components/MetaTags';
import { UserDescription } from '../../app/Profile/UserInformations/Description';
import { Opinions } from '../../app/Opinions';
import { OrganisationProfileSkipLinks } from '../../app/SkipLinks/Organisation';

const PersonalityPage: FC<RouteComponentProps<{ userId: string }>> = ({
  match: {
    params: { userId },
  },
}) => {
  const [personality, setPersonality] = useState<
    (PersonalityType & { profile: PersonalityProfileType }) | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const { country } = useParams<{ country: string }>();

  useEffect(() => {
    trackDisplayPublicProfile(USER.TYPE_PERSONALITY);
  }, []);

  useEffect(() => {
    const getPersonalityById = async () => {
      const response = await PersonalityService.getPersonalityById(userId);
      setPersonality(response);
      setIsLoading(false);
    };
    getPersonalityById();
  }, [userId]);

  if (!personality && isLoading) {
    return (
      <MiddlePageWrapperStyle aria-busy>
        <Spinner />
      </MiddlePageWrapperStyle>
    );
  }

  if (!personality) {
    return <Redirect to={getHomeLink(country)} />;
  }

  return (
    <>
      <OrganisationProfileSkipLinks />
      <MetaTags
        title={i18n.t('meta.organisation.positions.title', {
          organisation: `${personality.firstName} ${personality.lastName}`,
        })}
      />
      <ProfileHeaderStyle />
      <ProfilePageContentWrapperStyle>
        <ProfilePageSidebarWrapperStyle>
          <ProfilePageSidebarStyle>
            <ScreenReaderItemStyle as="h2">
              {i18n.t('personality.title', {
                name: `${personality.firstName} ${personality.lastName}`,
              })}
            </ScreenReaderItemStyle>
            <ProfileAvatarLayoutStyle>
              <ProfileAvatarStyle avatarSize={80}>
                <Avatar
                  avatarSize={isMobile ? 120 : 160}
                  avatarUrl={personality.profile.avatarUrl}
                />
              </ProfileAvatarStyle>
            </ProfileAvatarLayoutStyle>
            <ProfileContentWrapperStyle>
              <ProfileTitleStyle>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.firstname')}
                </ScreenReaderItemStyle>
                {personality.firstName}
                &nbsp;
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.lastname')}
                </ScreenReaderItemStyle>
                {personality.lastName}
                &nbsp;
                <CertifiedIconStyle aria-hidden focusable="false" />
              </ProfileTitleStyle>
            </ProfileContentWrapperStyle>
            {personality.profile.politicalParty && (
              <ProfileContentStyle>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.political_party')}
                </ScreenReaderItemStyle>
                {personality.profile.politicalParty}
              </ProfileContentStyle>
            )}
            {personality.profile.description && (
              <>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.biography')}
                </ScreenReaderItemStyle>
                <UserDescription
                  description={personality.profile.description}
                />
              </>
            )}
            {personality.profile.website && (
              <ProfileAlignLeftContentStyle>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.website')}
                </ScreenReaderItemStyle>
                <ProfileLinkIconStyle aria-hidden focusable="false" />
                <ProfileWebsiteLinkStyle
                  as="a"
                  target="_blank"
                  rel="noopener"
                  href={personality.profile.website}
                >
                  {personality.profile.website}
                </ProfileWebsiteLinkStyle>
              </ProfileAlignLeftContentStyle>
            )}
          </ProfilePageSidebarStyle>
          <TileWithTitle title={i18n.t('profile.organisation.sharing_title')}>
            <Sharing />
          </TileWithTitle>
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
          <Opinions personality={personality} />
        </ProfilePageContentStyle>
      </ProfilePageContentWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default PersonalityPage; // eslint-disable-line import/no-default-export
