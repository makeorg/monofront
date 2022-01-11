/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  addDemographicsToSequenceConfig,
  buildCards,
} from '@make.org/utils/helpers/sequence';
import {
  SequenceCardType,
  QuestionType,
  ProposalType,
  DemographicDataType,
  ExecuteStartSequence,
  FetchFirstProposalType,
  NoProposalCardType,
} from '@make.org/types';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import {
  loadSequenceCards,
  resetSequenceVotedProposals,
  setSequenceIndex,
  setSequenceLoading,
  setSequenceLength,
} from '@make.org/store/actions/sequence';
import { useAppContext } from '@make.org/store';
import { Cookies } from 'react-cookie';
import { COOKIE } from '@make.org/types/enums';
import { useSequenceTracking } from './useSequenceTracking';
import { useSequenceVoteOnlyNotification } from './useSequenceVoteOnlyNotification';
import { useSequenceQueryParams } from './useSequenceQueryParams';

type ReturnFunctionType = {
  currentCard: SequenceCardType | NoProposalCardType | null;
};

/**
 * Renders Sequence component with Intro / Push Proposal / Sign Up & Proposal Cards
 */
export const useSequence = (
  question: QuestionType,
  isStandardSequence: boolean,
  executeStartSequence: ExecuteStartSequence,
  noProposalCard: NoProposalCardType,
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
  const [currentCard, setCurrentCard] = useState<
    SequenceCardType | NoProposalCardType | null
  >(null);
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
  const withDemographicsCard = !demographicsCookie || isWidget;
  const extraSlidesConfig = addDemographicsToSequenceConfig(
    question.sequenceConfig,
    withDemographicsCard && question.hasDemographics,
    sequenceDemographic
  );
  const introCard = isWidget ? false : introCardParam;

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

        if (response.proposals) {
          setSequenceProposals(response.proposals);
        }

        if (response.demographics) {
          setSequenceDemographic(response.demographics);
        }
      }
      dispatch(setSequenceLoading(false));
    };

    if (sequence.cards.length > 0 && loadFirstProposal) {
      return;
    }

    loadSequenceData();
  }, [question, firstProposalParam, isLoggedIn, loadFirstProposal]);

  // build cards
  useEffect(() => {
    if (!question || !sequenceProposals.length) {
      return;
    }
    const buildedCards: SequenceCardType[] = buildCards(
      sequenceProposals,
      extraSlidesConfig,
      question.canPropose,
      isStandardSequence,
      introCard,
      pushProposalParam,
      loadFirstProposal
    );
    setCards(buildedCards);
    dispatch(setSequenceLength(buildedCards.length));
    dispatch(loadSequenceCards(buildedCards));
  }, [sequenceProposals, sequenceDemographic]);

  // set current card
  useEffect(() => {
    if (!cards.length) {
      setCurrentCard(noProposalCard);
      dispatch(setSequenceLength(0));
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
  };
};
