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
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { RouteComponentProps, useParams } from 'react-router';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import { PROPOSALS_LISTING_LIMIT } from '@make.org/utils/constants/proposal';
import { Pagination } from '@make.org/components/Pagination';
import { SearchBackButton } from '../../app/Search/BackButton';
import {
  SearchPageTitleStyle,
  SearchPageContentStyle,
  SearchPageResultsStyle,
  SearchResultsProposalListStyle,
  SearchPageWrapperStyle,
} from './style';
import { SearchResultsProposalItemStyle } from '../../app/Search/MainResults/Proposals/style';
import { SearchRegister } from '../../app/Search/Register';

export const SearchResultsProposals: React.FC<RouteComponentProps> = ({
  location,
  history,
}) => {
  const { state } = useAppContext();
  const { country, device, language } = state.appConfig;
  const searchParams = new URLSearchParams(location.search);
  const params: { country: string; pageId: string } = useParams();
  const { pageId } = params;
  const term = searchParams.get('query') || '';
  const isDesktop = matchDesktopDevice(device);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [proposalsTotal, setProposalsTotal] = useState<number>(0);

  const loadProposals = async () => {
    setIsLoading(true);

    const result = await searchProposals(
      country,
      language,
      undefined,
      term,
      undefined,
      undefined,
      PROPOSALS_LISTING_LIMIT,
      JSON.parse(pageId) - 1
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, pageId, language]);

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
              count: proposalsTotal,
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
              {proposals.map((proposal, index) => (
                <SearchResultsProposalItemStyle key={proposal.id}>
                  <ProposalCardWithQuestion
                    proposal={proposal}
                    position={index + 1}
                    size={proposals.length}
                  />
                </SearchResultsProposalItemStyle>
              ))}
            </SearchResultsProposalListStyle>
          </TopComponentContext.Provider>
          {isLoading && <Spinner />}
          {proposalsTotal > PROPOSALS_LISTING_LIMIT && (
            <Pagination
              itemsPerPage={PROPOSALS_LISTING_LIMIT}
              itemsTotal={proposalsTotal}
            />
          )}
        </SearchPageResultsStyle>
        {isDesktop && <SearchRegister />}
      </SearchPageContentStyle>
    </SearchPageWrapperStyle>
  );
};
