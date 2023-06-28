import React, { FC } from 'react';
import i18n from 'i18next';
import { MetaTags } from '@make.org/components/MetaTags';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import {
  ProfileContentHeaderStyle,
  ProfileHeaderStyle,
  ProfilePageContentStyle,
  ProfilePageContentWrapperStyle,
  ProfileTitleSeparatorStyle,
} from '@make.org/ui/elements/ProfileElements';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { Pagination } from '@make.org/components/Pagination';
import { PROPOSALS_LISTING_LIMIT } from '@make.org/utils/constants/proposal';
import { ProfileVoteCard } from '@make.org/components/Proposal/ProfileVoteCard';
import { Redirect } from 'react-router';
import { useAppContext } from '@make.org/store';
import { MiddlePageWrapperStyle } from '@make.org/ui/elements/MainElements';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { useOrganisation } from '@make.org/utils/hooks/useOrganisation';
import { OrganisationVotesPlaceholder } from './Placeholders/Votes';
import { OrganisationProfileSkipLinks } from '../../app/SkipLinks/Organisation';
import { OrganisationProfileSidebar } from './Sidebar';
import { OrganisationProfileTabs } from './Tabs';

const OrganisationVotesPage: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const { organisation, votes, isLoading, votesTotal } = useOrganisation(
    false,
    true
  );

  const votesLength = votes.length;
  const renderVotes = !!votesLength;
  const renderPlaceholder = !votesLength && !isLoading;

  if (!organisation && isLoading) {
    return (
      <MiddlePageWrapperStyle>
        <Spinner />
      </MiddlePageWrapperStyle>
    );
  }

  if (!organisation) {
    return <Redirect to={getHomeLink(country)} />;
  }

  return (
    <>
      <MetaTags
        title={i18n.t('meta.organisation.positions.title', {
          organisation: formatOrganisationName(organisation.organisationName),
        })}
      />
      <OrganisationProfileSkipLinks />
      <ProfileHeaderStyle />
      <ProfilePageContentWrapperStyle>
        <OrganisationProfileSidebar organisation={organisation} />
        <ProfilePageContentStyle>
          <OrganisationProfileTabs />
          <ProfileContentHeaderStyle>
            <SecondLevelTitleStyle>
              {i18n.t('organisation.votes.title', {
                name: formatOrganisationName(organisation.organisationName),
              })}
            </SecondLevelTitleStyle>
            <ProfileTitleSeparatorStyle />
          </ProfileContentHeaderStyle>
          {renderVotes && (
            <section>
              {votes.map((vote, index) => (
                <ProfileVoteCard
                  key={`organisation_votes_${vote.proposal.id}`}
                  voteKey={vote.vote}
                  proposal={vote.proposal}
                  organisation={organisation}
                  size={votes.length}
                  position={index + 1}
                />
              ))}
            </section>
          )}
          {isLoading && <Spinner />}
          {votesTotal > PROPOSALS_LISTING_LIMIT && (
            <Pagination
              itemsPerPage={PROPOSALS_LISTING_LIMIT}
              itemsTotal={votesTotal}
            />
          )}
          {renderPlaceholder && (
            <OrganisationVotesPlaceholder
              name={formatOrganisationName(organisation.organisationName)}
            />
          )}
        </ProfilePageContentStyle>
      </ProfilePageContentWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default OrganisationVotesPage; // eslint-disable-line import/no-default-export
