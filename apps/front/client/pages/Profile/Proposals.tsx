import React, { useState, useEffect, FC } from 'react';
import i18n from 'i18next';
import { ProposalType, UserType } from '@make.org/types';
import { UserService } from '@make.org/utils/services/User';
import { trackLoadMoreProposals } from '@make.org/utils/services/Tracking';
import { TRACKING } from '@make.org/types/enums';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  ProfileContentHeaderStyle,
  ProfileTitleSeparatorStyle,
} from '@make.org/ui/elements/ProfileElements';
import { ThirdLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { ProfileProposalCard } from '@make.org/components/Proposal/ProfileProposalCard';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { LoadMoreWrapperStyle } from '../../app/Consultation/Styled/Proposal';
import { ProfileProposalsPlaceholder } from './Placeholders/Proposals';

type Props = {
  user: UserType;
};

const ProfileProposalsPage: FC<Props> = ({ user }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [proposalList, setProposalList] = useState<{
    proposals: ProposalType[];
    hasMore: boolean;
    seed: number | undefined;
    page: number;
  }>({
    proposals: [],
    hasMore: false,
    seed: undefined,
    page: 0,
  });

  const { proposals, hasMore, seed, page } = proposalList;
  const loadProposals = async () => {
    setIsLoading(true);
    const result = await UserService.myProposals(user.userId, seed, page);
    if (result) {
      const { results, total, seed: apiSeed } = result;
      const newProposalList = [...proposals, ...results];
      setProposalList({
        proposals: newProposalList,
        hasMore: newProposalList.length < total,
        seed: apiSeed,
        page: page + 1,
      });
    }
    setIsLoading(false);
  };

  const clickLoadMore = () => {
    loadProposals();
    trackLoadMoreProposals(TRACKING.COMPONENT_PARAM_PROPOSALS, page);
  };

  useEffect(() => {
    if (user) {
      loadProposals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const proposalsLength = proposals.length;
  const renderPlaceholder = !proposalsLength && !isLoading;
  const renderProposals = !!proposalsLength;
  const displayLoadMoreButton = hasMore && !isLoading;
  return (
    <>
      <MetaTags title={i18n.t('meta.profile.proposals.title')} />
      <ProfileContentHeaderStyle>
        <ThirdLevelTitleStyle as="h2">
          {i18n.t('profile.proposals.title')}
        </ThirdLevelTitleStyle>
        <ProfileTitleSeparatorStyle />
      </ProfileContentHeaderStyle>
      {renderProposals && (
        <section role="feed" aria-live="polite">
          {proposals.map((proposal, index) => (
            <ProfileProposalCard
              key={proposal.id}
              proposal={proposal}
              size={proposalsLength}
              position={index}
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
      {renderPlaceholder && <ProfileProposalsPlaceholder />}
    </>
  );
};

// default export needed for loadable component
export default ProfileProposalsPage; // eslint-disable-line import/no-default-export
