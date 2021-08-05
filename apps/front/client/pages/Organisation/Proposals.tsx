import React, { FC, useState, useEffect } from 'react';
import i18n from 'i18next';
import { OrganisationType, ProposalType } from '@make.org/types';
import { OrganisationService } from '@make.org/utils/services/Organisation';
import { trackLoadMoreProposals } from '@make.org/utils/services/Tracking';
import { TRACKING } from '@make.org/types/enums';
import {
  TopComponentContext,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import { MetaTags } from '@make.org/components/MetaTags';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import {
  ProfileContentHeaderStyle,
  ProfileTitleSeparatorStyle,
} from '@make.org/ui/elements/ProfileElements';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { ProposalCardWithQuestion } from '@make.org/components/Proposal/ProposalCardWithQuestion';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { LoadMoreWrapperStyle } from '../../app/Consultation/Styled/Proposal';
import { OrganisationProposalsPlaceholder } from './Placeholders/Proposals';

type Props = {
  organisation: OrganisationType;
};

const OrganisationProposalsPage: FC<Props> = ({ organisation }) => {
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(0);

  const initProposal = async () => {
    setIsLoading(true);
    const proposalsResponse = await OrganisationService.getProposals(
      organisation.organisationId
    );
    if (proposalsResponse) {
      const { results, total, seed: apiSeed } = proposalsResponse;
      setProposals(results);
      setHasMore(results.length < total);
      setSeed(apiSeed);
      setPage(1);
    }
    setIsLoading(false);
  };

  const loadProposals = async () => {
    setIsLoading(true);
    const proposalsResponse = await OrganisationService.getProposals(
      organisation.organisationId,
      seed,
      page
    );
    if (proposalsResponse) {
      const { results, total, seed: apiSeed } = proposalsResponse;
      const newProposalList = [...proposals, ...results];
      setProposals(newProposalList);
      setHasMore(newProposalList.length < total);
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

  const proposalsLength = proposals.length;
  const renderProposals = !!proposalsLength;
  const renderPlaceholder = !proposalsLength && !isLoading;
  const displayLoadMoreButton = hasMore && !isLoading;

  const topComponentContext =
    TopComponentContextValue.getOrganisationProposalList();

  return (
    <>
      <MetaTags
        title={i18n.t('meta.organisation.proposals.title', {
          organisation: formatOrganisationName(organisation.organisationName),
        })}
      />
      <ProfileContentHeaderStyle>
        <SecondLevelTitleStyle>
          {i18n.t('organisation.proposals.title', {
            name: formatOrganisationName(organisation.organisationName),
          })}
        </SecondLevelTitleStyle>
        <ProfileTitleSeparatorStyle />
      </ProfileContentHeaderStyle>
      <TopComponentContext.Provider value={topComponentContext}>
        {renderProposals && (
          <section role="feed" aria-live="polite">
            {proposals.map((proposal, index) => (
              <ProposalCardWithQuestion
                key={proposal.id}
                proposal={proposal}
                position={index + 1}
                size={proposalsLength}
              />
            ))}
          </section>
        )}
      </TopComponentContext.Provider>
      {isLoading && <Spinner />}
      {displayLoadMoreButton && (
        <LoadMoreWrapperStyle>
          <RedButtonStyle onClick={clickLoadMore}>
            {i18n.t('consultation.proposal.load_more')}
          </RedButtonStyle>
        </LoadMoreWrapperStyle>
      )}
      {renderPlaceholder && (
        <OrganisationProposalsPlaceholder
          name={formatOrganisationName(organisation.organisationName)}
        />
      )}
    </>
  );
};

// default export needed for loadable component
export default OrganisationProposalsPage; // eslint-disable-line import/no-default-export
