import {
  DemographicDataType,
  SequenceCardType,
  QuestionType,
  ExecuteStartSequence,
  NoProposalCardType,
} from '@make.org/types';
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  addDemographicsToSequenceConfig,
  buildCards,
} from '@make.org/utils/helpers/sequence';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import {
  loadSequenceCards,
  resetSequenceVotedProposals,
  setSequenceIndex,
  setSequenceLoading,
  setSequenceLength,
  loadSequenceProposals,
  disableDemographicsCard,
  relaunchSequence,
} from '@make.org/store/actions/sequence';
import { useAppContext } from '@make.org/store';
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
  noProposalCard: NoProposalCardType
): ReturnFunctionType => {
  // Dispatch
  const { state, dispatch } = useAppContext();

  // StateRoot
  const { sequence } = state;
  const { isLoggedIn } = selectAuthentication(state) || {};
  const {
    currentIndex,
    votedProposalIds,
    cards,
    sequenceSize,
    isLoading,
    demographics,
    sequenceRelaunch,
  } = sequence || {};
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  const votedProposalIdsOfQuestion = votedProposalIds[question?.slug] || [];

  // State
  const [currentCard, setCurrentCard] = useState<
    SequenceCardType | NoProposalCardType
  >(cards[currentIndex] || noProposalCard);
  // Sequence hooks
  useSequenceTracking();
  useSequenceVoteOnlyNotification(question);
  const { firstProposalParam, introCardParam, pushProposalParam } =
    useSequenceQueryParams();

  // Other
  const introCardCheck = isWidget ? false : introCardParam;

  const votedIdsCheck = firstProposalParam
    ? [firstProposalParam, ...votedProposalIdsOfQuestion]
    : votedProposalIdsOfQuestion;

  // Load sequence data
  const loadSequenceData = async (introCard: boolean, votedIds: string[]) => {
    dispatch(setSequenceLoading(true));
    dispatch(setSequenceLength(0));

    if (question) {
      let buildedCards: SequenceCardType[] = [];
      let sequenceDemographics: DemographicDataType | undefined;
      const response = await executeStartSequence(
        question.questionId,
        votedIds,
        sequenceDemographics?.id,
        sequenceDemographics?.token
      );

      if (!response || !response.proposals) {
        return;
      }

      if (response.demographics) {
        sequenceDemographics = response.demographics;
      }

      if (response.proposals) {
        if (response.proposals.length === 0) {
          setCurrentCard(noProposalCard);
          dispatch(setSequenceLength(0));
          dispatch(setSequenceLoading(false));
          return;
        }

        dispatch(loadSequenceProposals(response.proposals));

        const extraSlidesConfig = addDemographicsToSequenceConfig(
          question.sequenceConfig,
          demographics.renderCard && question.hasDemographics,
          sequenceDemographics
        );

        buildedCards = buildCards(
          response.proposals,
          extraSlidesConfig,
          question.canPropose,
          isStandardSequence,
          introCard,
          pushProposalParam
        );
      }
      dispatch(loadSequenceCards(buildedCards));
      dispatch(setSequenceLength(buildedCards.length));
    }
    dispatch(setSequenceLoading(false));
  };

  // On mount
  useEffect(() => {
    // Exit if sequence if already loaded (SSR)
    // Sequence properties in Context will be reset when unmounting
    if (sequenceSize > 0 && !isLoading) {
      return;
    }
    scrollToTop();
    loadSequenceData(introCardCheck, votedIdsCheck);
  }, []);

  const cleanSequence = () => {
    dispatch(loadSequenceProposals([]));
    dispatch(loadSequenceCards([]));
    dispatch(resetSequenceVotedProposals(question?.slug));
    dispatch(setSequenceLength(0));
    dispatch(setSequenceIndex(0));
    dispatch(disableDemographicsCard());
  };

  // Used to reset and restart sequence
  useEffect(() => {
    if (sequenceRelaunch) {
      cleanSequence();
      loadSequenceData(false, []);
      dispatch(relaunchSequence(false));
    }
  }, [sequenceRelaunch]);

  // Update when user logged in
  useEffect(() => {
    if (isLoggedIn) {
      loadSequenceData(introCardCheck, votedIdsCheck);
    }
  }, [isLoggedIn]);

  // Set current card when index or cards are updated
  useEffect(() => {
    setCurrentCard(cards[currentIndex]);
  }, [cards, currentIndex]);

  // Reset sequence when unmount
  useEffect(
    () => () => {
      cleanSequence();
    },
    []
  );

  return {
    currentCard,
  };
};
