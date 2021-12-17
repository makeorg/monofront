import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { TRACKING } from '@make.org/types/enums';
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
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { ProfileVoteCard } from '@make.org/components/Proposal/ProfileVoteCard';
import { trackLoadMoreProposals } from '@make.org/utils/services/Tracking';
import { Redirect } from 'react-router';
import { useAppContext } from '@make.org/store';
import { MiddlePageWrapperStyle } from '@make.org/ui/elements/MainElements';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { useOrganisation } from '@make.org/utils/hooks/useOrganisation';
import { LoadMoreWrapperStyle } from '../../app/Consultation/Styled/Proposal';
import { OrganisationVotesPlaceholder } from './Placeholders/Votes';
import { OrganisationProfileSkipLinks } from '../../app/SkipLinks/Organisation';
import { OrganisationProfileSidebar } from './Sidebar';
import { OrganisationProfileTabs } from './Tabs';

const OrganisationVotesPage: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const [loadMoreVotes, setLoadMoreVotes] = useState(false);
  const { organisation, votes, isLoading, hasMore, page } = useOrganisation(
    loadMoreVotes,
    false,
    true
  );

  const votesLength = votes.length;
  const renderVotes = !!votesLength;
  const renderPlaceholder = !votesLength && !isLoading;
  const displayLoadMoreButton = hasMore && !isLoading;

  const clickLoadMore = () => {
    setLoadMoreVotes(true);
    trackLoadMoreProposals(TRACKING.COMPONENT_PARAM_PROPOSALS, page);
  };

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
            <section role="feed" aria-live="polite">
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
          {displayLoadMoreButton && (
            <LoadMoreWrapperStyle>
              <RedButtonStyle onClick={clickLoadMore}>
                {i18n.t('consultation.proposal.load_more')}
              </RedButtonStyle>
            </LoadMoreWrapperStyle>
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
