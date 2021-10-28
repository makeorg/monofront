/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { buildCards } from '@make.org/utils/helpers/sequence';
import {
  SequenceCardType,
  QuestionType,
  ProposalType,
  DemographicDataType,
  ExecuteStartSequence,
} from '@make.org/types';
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
import { useSequenceQueryParams } from './useSequenceQueryParams';

type ReturnFunctionType = {
  isLoading: boolean;
  currentCard: SequenceCardType | null;
  isEmptySequence: boolean;
};

/**
 * Renders Sequence component with Intro / Push Proposal / Sign Up & Proposal Cards
 */
export const useSequence = (
  question: QuestionType,
  isStandardSequence: boolean,
  executeStartSequence: ExecuteStartSequence
): ReturnFunctionType => {
  // Dispatch
  const { state, dispatch } = useAppContext();

  // StateRoot
  const { sequence } = state;
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
  const [sequenceDemographic, setSequenceDemographic] = useState<
    DemographicDataType | undefined
  >(undefined);

  // Sequence hooks
  useSequenceTracking();
  useSequenceVoteOnlyNotification(question);
  const { firstProposalParam, introCardParam, pushProposalParam } =
    useSequenceQueryParams();

  // Other
  const cookies = new Cookies();
  const demographicsCookie = cookies.get(COOKIE.DEMOGRAPHICS);
  const withDemographicsCard = !demographicsCookie && sequenceDemographic;

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
        const response = await executeStartSequence(
          question.questionId,
          votedIds,
          sequenceDemographic?.id,
          sequenceDemographic?.token
        );

        if (!response) {
          return;
        }

        const { proposals, demographics } = response;

        if (!proposals || proposals.length === 0) {
          setLoading(false);
        }

        if (proposals) {
          setSequenceProposals(proposals);
        }

        if (demographics) {
          setSequenceDemographic(demographics);
        }
      }
      setLoading(false);
    };
    loadSequenceData();
  }, [question, firstProposalParam, isLoggedIn]);

  // build cards
  useEffect(() => {
    if (!question || !sequenceProposals.length) {
      return;
    }
    const buildedCards: SequenceCardType[] = buildCards(
      sequenceProposals,
      question.sequenceConfig,
      question.canPropose,
      isStandardSequence,
      introCardParam,
      pushProposalParam,
      withDemographicsCard as DemographicDataType,
      isWidget
    );
    setCards(buildedCards);
    dispatch(loadSequenceCards(buildedCards));
  }, [sequenceProposals, sequenceDemographic]);

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
