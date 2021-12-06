/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect, FC } from 'react';
import i18n from 'i18next';
import { ProposalType } from '@make.org/types';
import { UserService } from '@make.org/utils/services/User';
import { TRACKING } from '@make.org/types/enums';
import { trackLoadMoreProposals } from '@make.org/utils/services/Tracking';
import { useAppContext } from '@make.org/store';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { ProfileFavouritesPlaceholder } from './Placeholders/Favourites';
import { ProfileProposalsList } from './ProposalsList';

const ProfileFavouritesPage: FC = () => {
  const { state } = useAppContext();
  const { user } = selectAuthentication(state);
  const Placeholder = <ProfileFavouritesPlaceholder />;
  const titles = {
    meta: i18n.t('meta.profile.favorites.title'),
    section: i18n.t('profile.favourites.title'),
  };
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const initProposal = async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      return;
    }
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
    if (!user) {
      setIsLoading(false);
      return;
    }
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

  return (
    <ProfileProposalsList
      titles={titles}
      proposals={proposals}
      hasMore={hasMore}
      isLoading={isLoading}
      handleLoadMore={clickLoadMore}
      placeholder={Placeholder}
    />
  );
};

// default export needed for loadable component
export default ProfileFavouritesPage; // eslint-disable-line import/no-default-export
