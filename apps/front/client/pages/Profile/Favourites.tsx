/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect, FC } from 'react';
import i18n from 'i18next';
import { useParams } from 'react-router';
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
  const { language } = state.appConfig;
  const params: { country: string; pageId: string } = useParams();
  const { pageId } = params;

  const Placeholder = <ProfileFavouritesPlaceholder />;
  const titles = {
    meta: i18n.t('meta.profile.favorites.title'),
    section: i18n.t('profile.favourites.title'),
  };
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [proposalsTotal, setProposalsTotal] = useState<number>(0);

  const loadProposals = async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      return;
    }
    const result = await UserService.myFavourites(
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
    trackLoadMoreProposals(TRACKING.COMPONENT_PARAM_FAVOURITES, Number(pageId));
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
export default ProfileFavouritesPage; // eslint-disable-line import/no-default-export
