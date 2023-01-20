import React, { useState, useEffect } from 'react';
import { SearchViewsType } from '@make.org/types';
import { ViewsService } from '@make.org/utils/services/Views';
import i18n from 'i18next';
import { trackDisplaySearchMainResult } from '@make.org/utils/services/Tracking';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { HiddenItemStyle } from '@make.org/ui/elements/HiddenElements';
import {
  getRouteSearchProposals,
  getRouteSearchConsultations,
  getRouteSearchOrganisations,
} from '@make.org/utils/routes';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  SearchPageWrapperStyle,
  SearchPageTitleStyle,
  SearchPageContentStyle,
  SearchPageResultsStyle,
  NoResultsStyle,
  MainResultsSectionStyle,
} from './style';
import { BusinessConsultationsList } from '../../app/Search/MainResults/BusinessConsultationItem';
import { MainResultsHeader } from '../../app/Search/MainResults/Header';
import { MainResultsProposals } from '../../app/Search/MainResults/Proposals';
import { MainResultsOrganisations } from '../../app/Search/MainResults/Organisations';
import { SearchRegister } from '../../app/Search/Register';

type Props = {
  location: Location;
};

export const SearchMainResults: React.FC<Props> = ({ location }) => {
  const { state } = useAppContext();
  const { country, device, language } = state.appConfig;
  const params = new URLSearchParams(location.search);
  const term = params.get('query') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SearchViewsType>({
    proposals: { total: 0, results: [] },
    questions: { total: 0, results: [] },
    organisations: { total: 0, results: [] },
  });
  const proposalsCount = data.proposals.total;
  const questionsCount = data.questions.total;
  const organisationsCount = data.organisations.total;
  const responseCount = proposalsCount + questionsCount + organisationsCount;
  const noResults = responseCount === 0;
  const isDesktop = matchDesktopDevice(device);

  useEffect(() => {
    trackDisplaySearchMainResult();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const searchResult = await ViewsService.searchViews(
        term,
        country,
        language
      );
      setData(searchResult || data);
      setIsLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, language]);

  return (
    <SearchPageWrapperStyle>
      <MetaTags
        title={i18n.t('meta.search.main_results', {
          term,
        })}
      />
      <SearchPageTitleStyle>
        {isLoading && i18n.t('search.titles.loading')}
        {!isLoading &&
          !!term &&
          i18n.t('search.titles.main_results', {
            term,
            count: responseCount,
          })}
        {!isLoading && !term && i18n.t('search.titles.main_results_empty_term')}
      </SearchPageTitleStyle>
      <SearchPageContentStyle>
        <SearchPageResultsStyle>
          {isLoading && <Spinner />}
          {!isLoading && noResults && (
            <>
              <HiddenItemStyle as="div">
                <h2>{i18n.t('search.titles.no_results')}</h2>
              </HiddenItemStyle>
              <NoResultsStyle>
                {term
                  ? i18n.t('search.main_results.no_results', {
                      term,
                    })
                  : i18n.t('search.main_results.no_query')}
              </NoResultsStyle>
            </>
          )}
          {!isLoading && !!responseCount && (
            <>
              {!!proposalsCount && (
                <MainResultsSectionStyle>
                  <MainResultsHeader
                    title={i18n.t('search.main_results.proposal', {
                      term,
                      count: proposalsCount,
                    })}
                    count={proposalsCount}
                    link={getRouteSearchProposals(country, term)}
                  />
                  <MainResultsProposals
                    searchTerm={term}
                    proposals={data.proposals.results}
                    count={proposalsCount}
                  />
                </MainResultsSectionStyle>
              )}
              {!!organisationsCount && (
                <MainResultsSectionStyle>
                  <MainResultsHeader
                    title={i18n.t('search.main_results.organisation', {
                      term,
                      count: organisationsCount,
                    })}
                    count={organisationsCount}
                    link={getRouteSearchOrganisations(country, term)}
                  />
                  <MainResultsOrganisations
                    organisations={data.organisations.results}
                  />
                </MainResultsSectionStyle>
              )}
              {!!questionsCount && (
                <MainResultsSectionStyle>
                  <MainResultsHeader
                    title={i18n.t('search.main_results.operation', {
                      term,
                      count: questionsCount,
                    })}
                    count={questionsCount}
                    link={getRouteSearchConsultations(country, term)}
                  />
                  <BusinessConsultationsList
                    questions={data.questions.results}
                  />
                </MainResultsSectionStyle>
              )}
            </>
          )}
        </SearchPageResultsStyle>
        {isDesktop && <SearchRegister />}
      </SearchPageContentStyle>
    </SearchPageWrapperStyle>
  );
};
