import React, { useState, useEffect } from 'react';
import { ProposalType } from '@make.org/types';
import i18n from 'i18next';
import { searchProposals } from '@make.org/utils/helpers/proposal';
import { ProposalCardWithQuestion } from '@make.org/components/Proposal/ProposalCardWithQuestion';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { trackDisplaySearchProposalsResult } from '@make.org/utils/services/Tracking';
import {
  TopComponentContext,
  TopComponentContextValueType,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import { SearchBackButton } from '@make.org/components/Search/BackButton';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { RouteComponentProps } from 'react-router';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '../../../app/MetaTags';
import {
  SearchPageTitleStyle,
  SearchPageContentStyle,
  SearchPageResultsStyle,
  SearchResultsProposalItemStyle,
  SearchMoreProposalsButtonStyle,
  SearchResultsProposalListStyle,
  SearchPageWrapperStyle,
} from '../Styled';
import { SearchSidebar } from '../Sidebar';

const PROPOSALS_LIMIT = 10;

export const SearchResultsProposals: React.FC<RouteComponentProps> = ({
  location,
  history,
}) => {
  const { state } = useAppContext();
  const { country, device } = state.appConfig;
  const params = new URLSearchParams(location.search);
  const term = params.get('query') || '';
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<number>(0);
  const [proposalsCount, setProposalsCount] = useState<number>(0);
  const [proposalsResult, setProposalsResult] = useState<ProposalType[]>([]);
  const getMoreButton =
    proposalsCount > PROPOSALS_LIMIT &&
    proposalsCount > proposalsResult.length &&
    !isLoading;
  const isDesktop = matchDesktopDevice(device);

  const initProposal = async () => {
    const result = await searchProposals(country, term, page);
    if (result) {
      const { results, total } = result;
      setProposalsResult(results);
      setProposalsCount(total);
      setPage(1);
    }
    setIsLoading(false);
  };

  const loadMoreProposals = async () => {
    setIsLoading(true);
    const result = await searchProposals(country, term, page, PROPOSALS_LIMIT);
    if (result) {
      const { results } = result;
      const newProposalList = [...proposalsResult, ...results];
      setProposalsResult(newProposalList);
      setPage(page + 1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initProposal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  useEffect(() => {
    trackDisplaySearchProposalsResult();
  }, []);

  const topComponentContext: TopComponentContextValueType =
    TopComponentContextValue.getSearchResultProposalList();

  return (
    <SearchPageWrapperStyle>
      <MetaTags
        title={i18n.t('meta.search.proposals', {
          term,
        })}
      />
      <SearchBackButton term={term} history={history} />
      <SearchPageTitleStyle>
        {isLoading
          ? i18n.t('search.titles.loading')
          : i18n.t('search.titles.proposals', {
              term,
              count: proposalsCount,
            })}
      </SearchPageTitleStyle>
      <SearchPageContentStyle>
        <SearchPageResultsStyle
          id="proposal_list"
          role="feed"
          aria-busy={isLoading}
        >
          <TopComponentContext.Provider value={topComponentContext}>
            <SearchResultsProposalListStyle>
              {proposalsResult.map((proposal, index) => (
                <SearchResultsProposalItemStyle key={proposal.id}>
                  <ProposalCardWithQuestion
                    proposal={proposal}
                    position={index + 1}
                    size={proposalsResult.length}
                  />
                </SearchResultsProposalItemStyle>
              ))}
            </SearchResultsProposalListStyle>
          </TopComponentContext.Provider>
          {isLoading && <Spinner />}
          {getMoreButton && (
            <SearchMoreProposalsButtonStyle onClick={loadMoreProposals}>
              {i18n.t('consultation.proposal.load_more')}
            </SearchMoreProposalsButtonStyle>
          )}
        </SearchPageResultsStyle>
        {isDesktop && <SearchSidebar />}
      </SearchPageContentStyle>
    </SearchPageWrapperStyle>
  );
};
