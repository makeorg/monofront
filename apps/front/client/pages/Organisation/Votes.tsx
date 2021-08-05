import React, { FC, useState, useEffect } from 'react';
import i18n from 'i18next';
import { OrganisationType, OrganisationVoteType } from '@make.org/types';
import { OrganisationService } from '@make.org/utils/services/Organisation';
import { TRACKING } from '@make.org/types/enums';
import { MetaTags } from '@make.org/components/MetaTags';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import {
  ProfileContentHeaderStyle,
  ProfileTitleSeparatorStyle,
} from '@make.org/ui/elements/ProfileElements';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { ProfileVoteCard } from '@make.org/components/Proposal/ProfileVoteCard';
import { trackLoadMoreProposals } from '@make.org/utils/services/Tracking';
import { LoadMoreWrapperStyle } from '../../app/Consultation/Styled/Proposal';
import { OrganisationVotesPlaceholder } from './Placeholders/Votes';

type Props = {
  organisation: OrganisationType;
};

const OrganisationVotesPage: FC<Props> = ({ organisation }) => {
  const [votes, setVotes] = useState<OrganisationVoteType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(0);

  const initProposal = async () => {
    setIsLoading(true);
    const response = await OrganisationService.getVotes(
      organisation.organisationId
    );
    if (response) {
      const { results, total, seed: apiSeed } = response;
      setVotes(results);
      setHasMore(results.length < total);
      setSeed(apiSeed);
      setPage(1);
    }

    setIsLoading(false);
  };

  const loadProposals = async () => {
    setIsLoading(true);
    const response = await OrganisationService.getVotes(
      organisation.organisationId,
      seed,
      page
    );
    if (response) {
      const { results, total, seed: apiSeed } = response;
      const newVotesList = [...votes, ...results];
      setVotes(newVotesList);
      setHasMore(newVotesList.length < total);
      setSeed(apiSeed);
      setPage(page + 1);
    }
    setIsLoading(false);
  };

  const clickLoadMore = () => {
    loadProposals();
    trackLoadMoreProposals(TRACKING.COMPONENT_PARAM_PROPOSALS, page);
  };

  useEffect(() => {
    initProposal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organisation]);

  const votesLength = votes.length;
  const renderVotes = !!votesLength;
  const renderPlaceholder = !votesLength && !isLoading;
  const displayLoadMoreButton = hasMore && !isLoading;

  return (
    <>
      <MetaTags
        title={i18n.t('meta.organisation.positions.title', {
          organisation: formatOrganisationName(organisation.organisationName),
        })}
      />
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
    </>
  );
};

// default export needed for loadable component
export default OrganisationVotesPage; // eslint-disable-line import/no-default-export
