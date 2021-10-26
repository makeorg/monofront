import React, { useEffect, useState, FC } from 'react';
import {
  ProposalType,
  QuestionKeywordType,
  QuestionType,
  TypeFilterAndSortValues,
} from '@make.org/types';
import i18n from 'i18next';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ThemeProvider } from 'styled-components';
import { NOTIF, IDS } from '@make.org/types/enums';
import { searchProposals } from '@make.org/utils/helpers/proposal';
import { useParams } from 'react-router';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { Pagination } from '@make.org/components/Pagination';
import { trackDisplayOperationPage } from '@make.org/utils/services/Tracking';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import { QuestionService } from '@make.org/utils/services/Question';
import { ProposalsList } from '../../app/Consultation/ProposalsList';
import { Timeline } from '../../app/Consultation/Timeline';
import { ParticipateNavigation } from '../../app/Consultation/Navigation/Participate';
import { ParticipateHighlights } from '../../app/Consultation/Highlights';
import { ParticipateHeader } from '../../app/Consultation/Header';
import { CitizenRegister } from '../../app/Consultation/CitizenRegister';
import { FilterAndSort } from '../../app/Consultation/ExploreFilters';
// import { SortAndFiltersCTA } from '../../app/Consultation/ExploreFilters/FilterAndSortPanel';
import {
  ParticipateContentStyle,
  ParticipateInnerStyle,
  ExploreSubTitleWrapperStyle,
  ExploreTitleStyle,
  ExploreProposalsCountStyle,
  ParticipateSidebarContentStyle,
  ExploreDescriptionStyle,
  ParticipateMainContentStyle,
} from './style';

const ExplorePage: FC = () => {
  const { state, dispatch } = useAppContext();
  const params: { country: string; pageId: string } = useParams();
  const { country, pageId } = params;
  const { device } = state.appConfig;
  const isDesktop = matchDesktopDevice(device);
  const question: QuestionType = selectCurrentQuestion(state);
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<QuestionKeywordType[]>([]);
  const [proposalsTotal, setProposalsTotal] = useState<number>(0);

  const PROPOSALS_LIMIT = 10;
  const KEYWORD_THRESHOLD = 5;
  const hasProposals = proposalsTotal > 0;

  // retrieves question Keywords for filter
  const getQuestionKeywords = async () => {
    setLoading(true);
    const response = await QuestionService.getQuestionKeywords(
      question.questionId,
      KEYWORD_THRESHOLD
    );
    if (response) {
      setKeyword(response);
      setLoading(false);
    }
  };

  // retrieves proposals with corresponding param for sort and filters
  const getProposals = async (values: TypeFilterAndSortValues) => {
    setLoading(true);
    const { keywords, sortAlgorithm, isNotVoted, userType, sort } = values;
    const sortAndFilterParams: TypeFilterAndSortValues = {
      keywords,
      sortAlgorithm,
      isNotVoted,
      userType,
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
    }

    setLoading(false);
  };

  useEffect(() => {
    getProposals(state.filterAndSort);
  }, [state.filterAndSort]);

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
  }, [question, dispatch]);

  useEffect(() => {
    getQuestionKeywords();
    trackDisplayOperationPage();
  }, []);

  useEffect(() => {
    getProposals(state.filterAndSort);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

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
                questionSlug={question.slug}
              />
            )}
          </ParticipateMainContentStyle>
          <ParticipateSidebarContentStyle>
            {isDesktop && <FilterAndSort keywords={keyword} />}
            {/* // ) : (
            //   <SortAndFiltersCTA
            //     filterAndSortValues={filterAndSortValues}
            //     setFilterAndSortValues={setFilterAndSortValues}
            //     keywords={keyword}
            //     handleSubmit={handleSubmit}
            //     handleReset={handleReset}
            //   />
            // )} */}
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
