/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect, FC } from 'react';
import i18n from 'i18next';
import { ProposalType } from '@make.org/types';
import { UserService } from '@make.org/utils/services/User';
import { trackLoadMoreProposals } from '@make.org/utils/services/Tracking';
import { TRACKING } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { useParams } from 'react-router';
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
  const { language } = state.appConfig;
  const params: { country: string; pageId: string } = useParams();
  const { pageId } = params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [proposalsTotal, setProposalsTotal] = useState<number>(0);

  const loadProposals = async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      return;
    }
    const result = await UserService.myProposals(
      user.userId,
      JSON.parse(pageId) - 1,
      language
    );
    if (result) {
      const { results, total } = result;
      setProposals(results);
      setProposalsTotal(total);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadProposals();
    trackLoadMoreProposals(TRACKING.COMPONENT_PARAM_PROPOSALS, Number(pageId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  useEffect(() => {
    if (!proposals && !isLoading) {
      loadProposals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    loadProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <ProfileProposalsList
      titles={titles}
      proposals={proposals}
      isLoading={isLoading}
      placeholder={Placeholder}
      proposalsTotal={proposalsTotal}
    />
  );
};

// default export needed for loadable component
export default ProfileProposalsPage; // eslint-disable-line import/no-default-export
