import React, { useEffect, useState, FC } from 'react';
import { ProposalType, QuestionType } from '@make.org/types';
import i18n from 'i18next';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ThemeProvider } from 'styled-components';
import {
  NOTIFICATION_LEVEL_INFORMATION,
  VOTE_ONLY_MESSAGE,
} from '@make.org/utils/constants/notifications';
import {
  getProposalsListTitle,
  searchProposals,
} from '@make.org/utils/helpers/proposal';
import { useParams } from 'react-router';
import { Pagination } from '@make.org/components/Pagination';
import { CONSULTATION_NAVIGATION } from '@make.org/utils/constants/ids';
import { trackDisplayOperationPage } from '@make.org/utils/services/Tracking';
import { useAppContext } from '@make.org/store';
import { ProposalsList } from '../../app/Consultation/ProposalsList';
import { MetaTags } from '../../app/MetaTags';
import { Timeline } from '../../app/Consultation/Timeline';
import { ParticipateNavigation } from '../../app/Consultation/Navigation/Participate';
import { ParticipateHighlights } from '../../app/Consultation/Highlights';
import { ParticipateHeader } from '../../app/Consultation/Header';
import { CitizenRegister } from '../../app/Consultation/CitizenRegister';

import {
  ParticipateContentStyle,
  ParticipateInnerStyle,
  ExploreTitleWrapperStyle,
  ExploreTitleStyle,
  ExploreProposalsCountStyle,
  ParticipateFullwidthContentStyle,
} from './style';

const ExplorePage: FC = () => {
  const params: { country: string; pageId: string } = useParams();
  const { country, pageId } = params;
  const { state, dispatch } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [proposalsTotal, setProposalsTotal] = useState<number>(0);
  const feedAlgorithm = 'RECENT';
  const PROPOSALS_LIMIT = 12;

  const title = getProposalsListTitle(feedAlgorithm);
  const hasProposals = proposalsTotal > 0;

  const getProposals = async () => {
    setLoading(true);
    const response = await searchProposals(
      country,
      undefined,
      JSON.parse(pageId) - 1,
      PROPOSALS_LIMIT,
      undefined,
      question.questionId,
      undefined,
      feedAlgorithm
    );

    if (response) {
      const { results, total } = response;
      setProposals(results);
      setProposalsTotal(total);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!question.canPropose) {
      dispatch(
        displayNotificationBanner(
          VOTE_ONLY_MESSAGE,
          NOTIFICATION_LEVEL_INFORMATION,
          { questionId: question.questionId },
          true
        )
      );
    }
  }, [question, dispatch]);

  useEffect(() => {
    trackDisplayOperationPage();
  }, []);

  useEffect(() => {
    getProposals();
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
      <div id={CONSULTATION_NAVIGATION} />
      <ParticipateNavigation />
      <ParticipateContentStyle>
        <ExploreTitleWrapperStyle>
          <ExploreTitleStyle>{title}</ExploreTitleStyle>
          {hasProposals && (
            <ExploreProposalsCountStyle>
              {i18n.t('common.proposal_count', { count: proposalsTotal })}
            </ExploreProposalsCountStyle>
          )}
        </ExploreTitleWrapperStyle>
        <ParticipateInnerStyle>
          <ParticipateFullwidthContentStyle>
            <ProposalsList isLoading={isLoading} proposals={proposals} />
            {proposalsTotal > PROPOSALS_LIMIT && (
              <Pagination
                itemsPerPage={PROPOSALS_LIMIT}
                itemsTotal={proposalsTotal}
                scrollToId={CONSULTATION_NAVIGATION}
                questionSlug={question.slug}
              />
            )}
          </ParticipateFullwidthContentStyle>
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
export default ExplorePage; // eslint-disable-line import/no-default-export
