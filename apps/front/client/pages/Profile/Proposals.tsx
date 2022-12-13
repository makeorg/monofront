/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect, FC } from 'react';
import i18n from 'i18next';
import { ProposalType } from '@make.org/types';
import { UserService } from '@make.org/utils/services/User';
import { trackLoadMoreProposals } from '@make.org/utils/services/Tracking';
import { TRACKING } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';

import { ProfileProposalsList } from './ProposalsList';
import { ProfileProposalsPlaceholder } from './Placeholders/Proposals';

const ProfileProposalsPage: FC = () => {
  const { state } = useAppContext();
  const { user } = selectAuthentication(state);
  const Placeholder = <ProfileProposalsPlaceholder />;
  const titles = {
    meta: i18n.t('meta.profile.proposals.title'),
    section: i18n.t('profile.proposals.title'),
  };

  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const loadProposals = async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      return;
    }
    const result = await UserService.myProposals(user.userId, page);
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
    trackLoadMoreProposals(TRACKING.COMPONENT_PARAM_PROPOSALS, page);
  };

  useEffect(() => {
    if (user) {
      loadProposals();
    }
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
export default ProfileProposalsPage; // eslint-disable-line import/no-default-export
