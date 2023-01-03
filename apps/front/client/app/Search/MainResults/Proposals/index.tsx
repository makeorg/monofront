import React, { useState, useEffect } from 'react';
import { ProposalType } from '@make.org/types';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { ProposalCardWithQuestion } from '@make.org/components/Proposal/ProposalCardWithQuestion';
import i18n from 'i18next';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';
import { searchProposals } from '@make.org/utils/helpers/proposal';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import {
  TopComponentContext,
  TopComponentContextValueType,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { MainResultsProposalsMobile } from './Mobile';
import {
  MainResultsProposalsItemStyle,
  SearchMoreProposalsButtonStyle,
} from './style';

type Props = {
  searchTerm: string;
  proposals: ProposalType[];
  count: number;
};

export const MainResultsProposals: React.FC<Props> = ({
  searchTerm,
  proposals,
  count,
}) => {
  const { state, dispatch } = useAppContext();
  const { country, device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [proposalsResult, setProposalsResult] =
    useState<ProposalType[]>(proposals);
  const PROPOSALS_LIMIT = 4;
  const getMoreButton =
    count > PROPOSALS_LIMIT && count !== proposalsResult.length && !isLoading;
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  // Page increment need to be reset if the serach term is changing
  useEffect(() => setPage(1), [searchTerm]);

  useEffect(() => {
    setProposalsResult(proposals);
  }, [proposals]);

  const loadMoreProposals = async () => {
    setIsLoading(true);
    const result = await searchProposals(
      country,
      undefined,
      searchTerm,
      undefined,
      undefined,
      PROPOSALS_LIMIT,
      page
    );

    if (result) {
      const { results } = result;
      const newProposalList = [...proposalsResult, ...results];
      setProposalsResult(newProposalList);
      setPage(page + 1);
    }
    setIsLoading(false);
  };

  const switchProposalContent = () => {
    setShowOriginal(!showOriginal);
    dispatch(closePanel());
    dispatch(removePanelContent());
  };

  if (isMobile) {
    return <MainResultsProposalsMobile proposals={proposals} />;
  }
  const topComponentContext: TopComponentContextValueType =
    TopComponentContextValue.getSearchResultProposalList();

  return (
    <div id="proposal_list" role="feed" aria-live="polite">
      <TopComponentContext.Provider value={topComponentContext}>
        <UnstyledListStyle>
          {proposalsResult.map((proposal, index) => (
            <MainResultsProposalsItemStyle key={proposal.id}>
              <ProposalCardWithQuestion
                proposal={proposal}
                position={index + 1}
                size={proposalsResult.length}
                switchProposalContent={switchProposalContent}
              />
            </MainResultsProposalsItemStyle>
          ))}
        </UnstyledListStyle>
        {isLoading && <Spinner />}
        {getMoreButton && (
          <SearchMoreProposalsButtonStyle onClick={loadMoreProposals}>
            {i18n.t('consultation.proposal.load_more')}
          </SearchMoreProposalsButtonStyle>
        )}
      </TopComponentContext.Provider>
    </div>
  );
};
