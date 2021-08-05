import React, { useEffect, useState, FC } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { OrganisationService } from '@make.org/utils/services/Organisation';
import { Redirect, useParams, useLocation } from 'react-router';
import loadable from '@loadable/component';
import i18n from 'i18next';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  TabNavStyle,
  TabListStyle,
  TabStyle,
} from '@make.org/ui/elements/TabsElements';
import {
  isOrganisationProposals as getIsOrganisationProposals,
  isOrganisationVotes as getIsOrganisationVotes,
  getRouteOrganisationProposals,
  getRouteOrganisationVotes,
  ROUTE_ORGANISATION_PROPOSALS,
  ROUTE_ORGANISATION_VOTES,
} from '@make.org/utils/routes';
import {
  ProfileHeaderStyle,
  ProfilePageContentWrapperStyle,
  ProfilePageSidebarWrapperStyle,
  ProfilePageSidebarStyle,
  ProfilePageContentStyle,
  ProfileAvatarLayoutStyle,
  ProfileAvatarStyle,
  ProfileContentWrapperStyle,
  ProfileTitleStyle,
  ProfileAlignLeftContentStyle,
  ProfileWebsiteLinkStyle,
  ProfileLinkIconStyle,
} from '@make.org/ui/elements/ProfileElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import { trackDisplayPublicProfile } from '@make.org/utils/services/Tracking';
import { CertifiedIconStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { OrganisationType } from '@make.org/types';
import { MiddlePageWrapperStyle } from '@make.org/ui/elements/MainElements';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { Sharing } from '@make.org/components/Sharing';
import { Avatar } from '@make.org/ui/components/Avatar';
import { USER } from '@make.org/types/enums';
import { OrganisationProfileSkipLinks } from '../../app/SkipLinks/Organisation';
import { UserDescription } from '../../app/Profile/UserInformations/Description';

const OrganisationProposalsPage = loadable(() => import('./Proposals'));
const OrganisationVotesPage = loadable(() => import('./Votes'));

const OrganisationPage: FC = () => {
  const { state } = useAppContext();
  const params: { country: string; organisationSlug: string } = useParams();
  const { pathname } = useLocation();
  const [organisation, setOrganisation] = useState<OrganisationType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const { country, organisationSlug } = params;
  const organisationProposalsLink = getRouteOrganisationProposals(
    country,
    organisationSlug
  );
  const organisationFavouritesLink = getRouteOrganisationVotes(
    country,
    organisationSlug
  );

  const isOrganisationProposalsActive = getIsOrganisationProposals(pathname);
  const isOrganisationVotesActive = getIsOrganisationVotes(pathname);

  useEffect(() => {
    trackDisplayPublicProfile(USER.TYPE_ORGANISATION);
  }, []);

  useEffect(() => {
    const fetchOrganisation = async () => {
      const response = await OrganisationService.getOrganisationBySlug(
        organisationSlug
      );

      setOrganisation(response);
      setIsLoading(false);
    };

    fetchOrganisation();
  }, [organisationSlug]);

  if (!organisation && isLoading) {
    return (
      <MiddlePageWrapperStyle aria-busy>
        <Spinner />
      </MiddlePageWrapperStyle>
    );
  }

  if (!organisation) {
    return <Redirect to={getHomeLink(country)} />;
  }

  return (
    <>
      <OrganisationProfileSkipLinks />
      <MetaTags />
      <ProfileHeaderStyle />
      <ProfilePageContentWrapperStyle>
        <ProfilePageSidebarWrapperStyle>
          <ProfilePageSidebarStyle>
            <ScreenReaderItemStyle as="h2">
              {i18n.t('organisation.title', {
                name: formatOrganisationName(organisation.organisationName),
              })}
            </ScreenReaderItemStyle>
            <ProfileAvatarLayoutStyle>
              <ProfileAvatarStyle avatarSize={80}>
                <Avatar
                  avatarSize={isMobile ? 120 : 160}
                  avatarUrl={organisation.avatarUrl}
                />
              </ProfileAvatarStyle>
            </ProfileAvatarLayoutStyle>
            <ProfileContentWrapperStyle>
              <ProfileTitleStyle>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.organisation')}
                </ScreenReaderItemStyle>
                {formatOrganisationName(organisation.organisationName)}
                <CertifiedIconStyle aria-hidden focusable="false" />
              </ProfileTitleStyle>
            </ProfileContentWrapperStyle>
            {organisation.description && (
              <>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.biography')}
                </ScreenReaderItemStyle>
                <UserDescription description={organisation.description} />
              </>
            )}
            {organisation.website && (
              <ProfileAlignLeftContentStyle>
                <ScreenReaderItemStyle>
                  {i18n.t('profile.common.labels.website')}
                </ScreenReaderItemStyle>
                <ProfileLinkIconStyle aria-hidden focusable="false" />
                <ProfileWebsiteLinkStyle
                  as="a"
                  target="_blank"
                  rel="noopener"
                  href={organisation.website}
                >
                  {organisation.website}
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
            <TabListStyle>
              <TabStyle isSelected={isOrganisationProposalsActive}>
                <Link
                  to={organisationProposalsLink}
                  aria-current={isOrganisationProposalsActive}
                >
                  {i18n.t('organisation.tabs.proposals')}
                </Link>
              </TabStyle>
              <TabStyle isSelected={isOrganisationVotesActive}>
                <Link
                  to={organisationFavouritesLink}
                  aria-current={isOrganisationVotesActive}
                >
                  {i18n.t('organisation.tabs.votes')}
                </Link>
              </TabStyle>
            </TabListStyle>
          </TabNavStyle>
          <Switch>
            <Route
              path={ROUTE_ORGANISATION_PROPOSALS}
              exact
              component={() => (
                <OrganisationProposalsPage organisation={organisation} />
              )}
            />
            <Route
              path={ROUTE_ORGANISATION_VOTES}
              exact
              component={() => (
                <OrganisationVotesPage organisation={organisation} />
              )}
            />
          </Switch>
        </ProfilePageContentStyle>
      </ProfilePageContentWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default OrganisationPage; // eslint-disable-line import/no-default-export
