import React, { useState, useEffect, FC } from 'react';
import i18n from 'i18next';
import { ProposalType, UserType } from '@make.org/types';

import { UserService } from '@make.org/utils/services/User';
import { TRACKING } from '@make.org/types/enums';
import { trackLoadMoreProposals } from '@make.org/utils/services/Tracking';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  ProfileContentHeaderStyle,
  ProfileTitleSeparatorStyle,
} from '@make.org/ui/elements/ProfileElements';
import { ThirdLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { ProfileProposalCard } from '@make.org/components/Proposal/ProfileProposalCard';
import { LoadMoreWrapperStyle } from '../../app/Consultation/Styled/Proposal';
import { ProfileFavouritesPlaceholder } from './Placeholders/Favourites';

type Props = {
  user: UserType;
};

const ProfileFavouritesPage: FC<Props> = ({ user }) => {
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const initProposal = async () => {
    setIsLoading(true);
    const result = await UserService.myFavourites(user.userId);
    if (result) {
      const { results, total } = result;
      setProposals(results);
      setHasMore(results.length < total);
      setPage(1);
    }
    setIsLoading(false);
  };

  const loadProposals = async () => {
    setIsLoading(true);
    const result = await UserService.myFavourites(user.userId, page);
    if (result) {
      const { results, total } = result;
      const newProposalList = [...proposals, ...results];
      setProposals(newProposalList);
      setHasMore(newProposalList.length < total);
      setPage(page + 1);
    }
    setIsLoading(false);
  };

  const clickLoadMore = () => {
    loadProposals();
    trackLoadMoreProposals(TRACKING.COMPONENT_PARAM_FAVOURITES, page);
  };

  useEffect(() => {
    initProposal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const proposalsLength = proposals.length;
  const renderProposals = !!proposalsLength;
  const renderPlaceholder = !proposalsLength && !isLoading;
  const displayLoadMoreButton = hasMore && !isLoading;
  return (
    <>
      <MetaTags title={i18n.t('meta.profile.favorites.title')} />
      <ProfileContentHeaderStyle>
        <ThirdLevelTitleStyle as="h2">
          {i18n.t('profile.favourites.title')}
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
      {renderPlaceholder && <ProfileFavouritesPlaceholder />}
    </>
  );
};

// default export needed for loadable component
export default ProfileFavouritesPage; // eslint-disable-line import/no-default-export
