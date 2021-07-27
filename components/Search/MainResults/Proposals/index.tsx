// @flow
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type ProposalType } from '@make.org/utils/types/proposal';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { ProposalCardWithQuestion } from 'Client/features/proposal/ProposalCardWithQuestion';
import i18n from 'i18next';
import { searchProposals } from '@make.org/utils/helpers/proposal';
import { type StateRoot } from '@make.org/utils/store/types';
import { Spinner } from '@make.org/ui/elements/Loading/Spinner';
import { SearchMoreProposalsButtonStyle } from 'Client/pages/Search/Styled';
import {
  TopComponentContext,
  type TopComponentContextValueType,
  TopComponentContextValue,
} from 'Client/context/TopComponentContext';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { MainResultsProposalsMobile } from './Mobile';
import { MainResultsProposalsItemStyle } from './Styled';

type Props = {
  searchTerm: string,
  proposals: ProposalType[],
  count: number,
};

export const MainResultsProposals = ({
  searchTerm,
  proposals,
  count,
}: Props) => {
  const { country, device } = useSelector(
    (state: StateRoot) => state.appConfig
  );
  const isMobile = matchMobileDevice(device);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [proposalsResult, setProposalsResult] =
    useState<ProposalType[]>(proposals);
  const getMoreButton =
    count > 4 && count !== proposalsResult.length && !isLoading;

  useEffect(() => {
    setProposalsResult(proposals);
  }, [proposals]);

  const loadMoreProposals = async () => {
    setIsLoading(true);
    const result = await searchProposals(country, searchTerm, page, 4);
    if (result) {
      const { results } = result;
      const newProposalList = [...proposalsResult, ...results];
      setProposalsResult(newProposalList);
      setPage(page + 1);
    }
    setIsLoading(false);
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
