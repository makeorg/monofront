/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { buildCards, getSequenceSize } from '@make.org/utils/helpers/sequence';
import {
  SequenceCardType,
  QuestionType,
  ProposalType,
  DemographicDataType,
  ExecuteStartSequence,
  FetchFirstProposalType,
} from '@make.org/types';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import {
  loadSequenceCards,
  resetSequenceVotedProposals,
  setSequenceIndex,
  setSequenceLoading,
} from '@make.org/store/actions/sequence';
import { useAppContext } from '@make.org/store';
import { Cookies } from 'react-cookie';
import { COOKIE } from '@make.org/types/enums';
import { useSequenceTracking } from './useSequenceTracking';
import { useSequenceVoteOnlyNotification } from './useSequenceVoteOnlyNotification';
import { useSequenceQueryParams } from './useSequenceQueryParams';

type ReturnFunctionType = {
  currentCard: SequenceCardType | null;
  sequenceLength: number;
  isEmptySequence: boolean;
};

/**
 * Renders Sequence component with Intro / Push Proposal / Sign Up & Proposal Cards
 */
export const useSequence = (
  question: QuestionType,
  isStandardSequence: boolean,
  executeStartSequence: ExecuteStartSequence,
  fetchFirstProposal?: FetchFirstProposalType
): ReturnFunctionType => {
  // Dispatch
  const { state, dispatch } = useAppContext();

  // StateRoot
  const { sequence } = state;
  const { isLoggedIn } = selectAuthentication(state) || {};
  const {
    currentIndex = 0,
    votedProposalIds,
    loadFirstProposal,
  } = sequence || {};
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  const votedProposalIdsOfQuestion = votedProposalIds[question?.slug] || [];

  // State
  const [currentCard, setCurrentCard] = useState<SequenceCardType | null>(null);
  const [cards, setCards] = useState<SequenceCardType[]>([]);
  const [sequenceProposals, setSequenceProposals] = useState<ProposalType[]>(
    []
  );
  const [sequenceDemographic, setSequenceDemographic] = useState<
    DemographicDataType | undefined
  >(undefined);
  const [sequenceLength, setSequenceLength] = useState<number>(0);

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
      dispatch(setSequenceLoading(true));
      const votedIds = firstProposalParam
        ? [firstProposalParam, ...votedProposalIdsOfQuestion]
        : votedProposalIdsOfQuestion;

      if (question) {
        let response;

        if (loadFirstProposal && fetchFirstProposal) {
          response = await fetchFirstProposal(question.questionId);
        } else {
          response = await executeStartSequence(
            question.questionId,
            votedIds,
            sequenceDemographic?.id,
            sequenceDemographic?.token
          );
        }

        if (!response) {
          return;
        }

        const { proposals, demographics, length } = response;

        if (proposals) {
          setSequenceProposals(proposals);
        }

        if (demographics) {
          setSequenceDemographic(demographics);
        }

        if (length) {
          setSequenceLength(
            getSequenceSize(
              length,
              question.sequenceConfig,
              question.canPropose,
              introCardParam,
              pushProposalParam,
              (!demographicsCookie && demographics) as DemographicDataType,
              isWidget
            )
          );
        }
      }
      dispatch(setSequenceLoading(false));
    };
    loadSequenceData();
  }, [question, firstProposalParam, isLoggedIn, loadFirstProposal]);

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
      isWidget,
      loadFirstProposal
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
    currentCard,
    sequenceLength,
    isEmptySequence: sequenceLength === 0,
  };
};
