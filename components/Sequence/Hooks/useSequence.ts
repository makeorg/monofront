/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { buildCards } from '@make.org/utils/helpers/sequence';
import { SequenceCardType, QuestionType, ProposalType } from '@make.org/types';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import {
  loadSequenceCards,
  resetSequenceVotedProposals,
  setSequenceIndex,
} from '@make.org/store/actions/sequence';
import { useAppContext } from '@make.org/store';
import { Cookies } from 'react-cookie';
import { COOKIE } from '@make.org/types/enums';
import { useSequenceTracking } from './useSequenceTracking';
import { useSequenceVoteOnlyNotification } from './useSequenceVoteOnlyNotification';
import { useSequenceExtraDataAutoSubmit } from './useSequenceExtraDataAutoSubmit';
import { useSequenceQueryParams } from './useSequenceQueryParams';

type ReturnFunctionType = {
  isLoading: boolean;
  currentCard: SequenceCardType | null;
  isEmptySequence: boolean;
};
type ExecuteStartSequence = (
  questionId: string,
  votedIds: string[]
) => Promise<ProposalType[] | null>;

/**
 * Renders Sequence component with Intro / Push Proposal / Sign Up & Proposal Cards
 */
export const useSequence = (
  question: QuestionType,
  isStandardSequence: boolean,
  country: string,
  executeStartSequence: ExecuteStartSequence
): ReturnFunctionType => {
  // Dispatch
  const { state, dispatch } = useAppContext();

  // StateRoot
  const { proposal, sequence } = state;
  const { hasProposed = false } = proposal || {};
  const { isLoggedIn } = selectAuthentication(state) || {};
  const { currentIndex = 0, votedProposalIds } = sequence || {};
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  const votedProposalIdsOfQuestion = votedProposalIds[question?.slug] || [];

  // State
  const [currentCard, setCurrentCard] = useState<SequenceCardType | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [cards, setCards] = useState<SequenceCardType[]>([]);
  const [sequenceProposals, setSequenceProposals] = useState<ProposalType[]>(
    []
  );

  // Sequence hooks
  useSequenceTracking();
  useSequenceVoteOnlyNotification(question);
  const { firstProposalParam, introCardParam, pushProposalParam } =
    useSequenceQueryParams();
  useSequenceExtraDataAutoSubmit(question?.slug, cards, currentIndex);

  // Other
  const isFR = country === 'FR';
  const cookies = new Cookies();
  const demographicsCookie = cookies.get(COOKIE.DEMOGRAPHICS);
  const withDemographicsCard = isFR && !demographicsCookie;

  // scroll to top
  useEffect(() => {
    scrollToTop();
    dispatch(setSequenceIndex(0));
  }, []);

  // load sequence data
  useEffect(() => {
    const loadSequenceData = async () => {
      const votedIds = firstProposalParam
        ? [firstProposalParam, ...votedProposalIdsOfQuestion]
        : votedProposalIdsOfQuestion;

      if (question) {
        const proposals = await executeStartSequence(
          question.questionId,
          votedIds
        );
        if (!proposals || proposals.length === 0) {
          setLoading(false);
        }

        if (proposals) {
          setSequenceProposals(proposals);
        }
      }
      setLoading(false);
    };
    loadSequenceData();
  }, [question, firstProposalParam, isLoggedIn, hasProposed]);

  // build cards
  useEffect(() => {
    if (!question || !sequenceProposals.length) {
      return;
    }
    const buildedCards: SequenceCardType[] = buildCards(
      sequenceProposals,
      question.sequenceConfig,
      hasProposed,
      question.canPropose,
      isStandardSequence,
      introCardParam,
      pushProposalParam,
      withDemographicsCard,
      isWidget
    );
    setCards(buildedCards);
    dispatch(loadSequenceCards(buildedCards));
  }, [hasProposed, sequenceProposals]);

  // set current card
  useEffect(() => {
    if (!cards.length) {
      return;
    }
    setCurrentCard(cards[currentIndex]);
    setLoading(false);
  }, [cards, currentIndex]);

  // reset voted proposals when unmount
  useEffect(
    () => () => {
      if (question) {
        dispatch(resetSequenceVotedProposals(question.slug));
      }
    },
    []
  );

  return {
    isLoading,
    currentCard,
    isEmptySequence: sequenceProposals.length === 0,
  };
};
