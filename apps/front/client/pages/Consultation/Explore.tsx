import React, { useEffect, useState, FC } from 'react';
import {
  ProposalType,
  QuestionType,
  TypeFilterAndSortValues,
} from '@make.org/types';
import i18n from 'i18next';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ThemeProvider } from 'styled-components';
import { NOTIF, IDS } from '@make.org/types/enums';
import { searchProposals } from '@make.org/utils/helpers/proposal';
import { useParams, useLocation } from 'react-router';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { Pagination } from '@make.org/components/Pagination';
import {
  trackDisplayNoResultsCard,
  trackDisplayOperationPage,
} from '@make.org/utils/services/Tracking';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import { modalShowSort, modalShowFilters } from '@make.org/store/actions/modal';
import { parse } from 'query-string';
import { SvgArrowsGroup } from '../../app/Consultation/ExploreFilters/style';
import { ProposalsList } from '../../app/Consultation/ProposalsList';
import { Timeline } from '../../app/Consultation/Timeline';
import { ParticipateNavigation } from '../../app/Consultation/Navigation/Participate';
import { ParticipateHighlights } from '../../app/Consultation/Highlights';
import { ParticipateHeader } from '../../app/Consultation/Header';
import { CitizenRegister } from '../../app/Consultation/CitizenRegister';
import { FilterAndSort } from '../../app/Consultation/ExploreFilters';
import {
  ParticipateContentStyle,
  ParticipateInnerStyle,
  ExploreSubTitleWrapperStyle,
  ExploreTitleStyle,
  ExploreProposalsCountStyle,
  ParticipateSidebarContentStyle,
  ExploreDescriptionStyle,
  ParticipateMainContentStyle,
  FiltersAndSortCTAWrapperStyle,
  FiltersAndSortCTAStyle,
  SvgFiltersMobile,
  FiltersCounterStyle,
} from './style';

const ExplorePage: FC = () => {
  const { state, dispatch } = useAppContext();
  const params: { country: string; pageId: string } = useParams();
  const { country, pageId } = params;
  const { search } = useLocation();
  const queryParamsValue = parse(search);
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const question: QuestionType = selectCurrentQuestion(state);
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [proposalsTotal, setProposalsTotal] = useState<number>(0);

  const PROPOSALS_LIMIT = 10;
  const hasProposals = proposalsTotal > 0;

  // retrieves proposals with corresponding param for sort and filters
  const getProposals = async (values: TypeFilterAndSortValues) => {
    setLoading(true);
    const { keywords, sortAlgorithm, isNotVoted, userType, sort } = values;
    const sortAndFilterParams: TypeFilterAndSortValues = {
      keywords,
      sortAlgorithm,
      isNotVoted,
      userType,
      sort,
    };
    const response = await searchProposals(
      country,
      question.questionId,
      undefined,
      undefined,
      undefined,
      PROPOSALS_LIMIT,
      JSON.parse(pageId) - 1,
      sort,
      undefined,
      undefined,
      sortAndFilterParams
    );

    if (response) {
      const { results, total } = response;
      setProposals(results);
      setProposalsTotal(total);
      if (total === 0) {
        trackDisplayNoResultsCard();
      }
    }
    setLoading(false);
  };

  const countSelectedFilter = (): number => {
    const filtersValue = [];

    if (queryParamsValue.keywords) {
      filtersValue.push(queryParamsValue.keywords);
    }
    if (queryParamsValue.isNotVoted) {
      filtersValue.push(queryParamsValue.isNotVoted);
    }
    if (queryParamsValue.userType) {
      filtersValue.push(queryParamsValue.userType);
    }

    return filtersValue.length;
  };

  // used to update proposals with queryParams and pageId
  useEffect(() => {
    getProposals(queryParamsValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId, search]);

  useEffect(() => {
    if (!question.canPropose) {
      dispatch(
        displayNotificationBanner(
          NOTIF.VOTE_ONLY_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_INFORMATION,
          { questionId: question.questionId },
          true
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  useEffect(() => {
    trackDisplayOperationPage();
  }, []);

  return (
    <ThemeProvider theme={question.theme}>
      <MetaTags
        title={i18n.t('meta.explore.title', {
          question: question.wording.question,
        })}
        description={question.wording.metas.description}
        picture={question.wording.metas.picture}
      />
      <ParticipateHeader />
      <ParticipateHighlights />
      <div id={IDS.CONSULTATION_NAVIGATION} />
      <ParticipateNavigation />
      {isMobile && (
        <FiltersAndSortCTAWrapperStyle>
          <FiltersAndSortCTAStyle
            type="button"
            onClick={() => dispatch(modalShowSort())}
          >
            <SvgArrowsGroup aria-hidden focusable="false" />
            {i18n.t('consultation.explore.sort')}
          </FiltersAndSortCTAStyle>
          <FiltersAndSortCTAStyle
            type="button"
            onClick={() => dispatch(modalShowFilters())}
          >
            <SvgFiltersMobile aria-hidden focusable="false" />
            {i18n.t('consultation.explore.filter')}
            {countSelectedFilter() > 0 && (
              <FiltersCounterStyle>{countSelectedFilter()}</FiltersCounterStyle>
            )}
          </FiltersAndSortCTAStyle>
        </FiltersAndSortCTAWrapperStyle>
      )}
      <ParticipateContentStyle>
        <ExploreTitleStyle>
          {i18n.t('consultation.explore.title')}
        </ExploreTitleStyle>
        <ExploreSubTitleWrapperStyle>
          {i18n.t('consultation.explore.description')}
        </ExploreSubTitleWrapperStyle>
        <ExploreDescriptionStyle>
          <ExploreProposalsCountStyle>
            {hasProposals
              ? i18n.t('common.proposal_count', { count: proposalsTotal })
              : i18n.t('consultation.explore.no_proposal')}
          </ExploreProposalsCountStyle>
        </ExploreDescriptionStyle>
        <ParticipateInnerStyle>
          <ParticipateMainContentStyle>
            <ProposalsList isLoading={isLoading} proposals={proposals} />
            {proposalsTotal > PROPOSALS_LIMIT && (
              <Pagination
                itemsPerPage={PROPOSALS_LIMIT}
                itemsTotal={proposalsTotal}
                scrollToId={IDS.CONSULTATION_NAVIGATION}
              />
            )}
          </ParticipateMainContentStyle>
          <ParticipateSidebarContentStyle>
            {!isMobile && <FilterAndSort />}
          </ParticipateSidebarContentStyle>
        </ParticipateInnerStyle>
      </ParticipateContentStyle>
      <Timeline />
      <ParticipateContentStyle as="aside">
        <CitizenRegister />
      </ParticipateContentStyle>
    </ThemeProvider>
  );
};

// default export needed for loadable component
export default ExplorePage;
