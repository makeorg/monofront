import {
  DemographicDataType,
  SequenceCardType,
  QuestionType,
  ExecuteStartSequence,
  NoProposalCardType,
  QuestionExtraSlidesConfigType,
  ILogger,
} from '@make.org/types';
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { buildCards } from '@make.org/utils/helpers/sequence';
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
  setSequenceSessionBindingMode,
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
  noProposalCard: NoProposalCardType,
  logger: ILogger
): ReturnFunctionType => {
  // Dispatch
  const { state, dispatch } = useAppContext();

  // StateRoot
  const { sequence: sequenceFromState } = state;
  const { isLoggedIn } = selectAuthentication(state) || {};
  const {
    currentIndex,
    votedProposalIds,
    cards: cardsFromState,
    sequenceSize: sequenceSizeFromState,
    isLoading,
    demographics: demographicsFromState,
    sequenceRelaunch,
  } = sequenceFromState || {};

  const { source, language } = state.appConfig;
  const isWidget = source === 'widget';
  const votedProposalIdsOfQuestion = votedProposalIds[question?.slug] || [];

  // State
  const [currentCard, setCurrentCard] = useState<
    SequenceCardType | NoProposalCardType
  >(cardsFromState[currentIndex] || noProposalCard);
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
  const loadSequenceData = async (
    introCardEnabled: boolean | null,
    votedIds: string[]
  ) => {
    dispatch(setSequenceLoading(true));
    dispatch(setSequenceLength(0));
    if (question) {
      let buildedCards: SequenceCardType[] = [];
      const result = await executeStartSequence(
        question.questionId,
        votedIds,
        language,
        null,
        null
      );

      if (!result) {
        return;
      }
      const {
        demographics: demographicsResult,
        proposals: sequenceProposals,
        sessionBindingMode,
      } = result;

      if (!sequenceProposals || sequenceProposals.length === 0) {
        setCurrentCard(noProposalCard);
        dispatch(setSequenceLength(0));
        dispatch(setSequenceLoading(false));

        return;
      }

      dispatch(loadSequenceProposals(sequenceProposals));

      const displayDemographics =
        sessionBindingMode || !demographicsFromState.demographicsCookie;
      const sequenceDemographics: DemographicDataType[] = displayDemographics
        ? demographicsResult ?? []
        : [];

      const extraSlidesConfig: QuestionExtraSlidesConfigType = {
        ...question.sequenceConfig,
        demographics: sequenceDemographics,
        isDemographicsSessionBindingMode: !!sessionBindingMode,
      };

      if (extraSlidesConfig.introCard) {
        extraSlidesConfig.introCard.enabled =
          introCardEnabled ?? extraSlidesConfig.introCard.enabled;
      }

      if (extraSlidesConfig.pushProposalCard) {
        extraSlidesConfig.pushProposalCard.enabled =
          question.canPropose &&
          (pushProposalParam ?? extraSlidesConfig.pushProposalCard.enabled);
      }

      buildedCards = buildCards(
        sequenceProposals,
        extraSlidesConfig,
        isStandardSequence
      );

      dispatch(setSequenceSessionBindingMode(sessionBindingMode));
      dispatch(loadSequenceCards(buildedCards));
      dispatch(setSequenceLength(buildedCards.length));
    }
    dispatch(setSequenceLoading(false));
  };

  // On mount
  useEffect(() => {
    // Exit if sequence is already loaded (SSR)
    // Sequence properties in Context will be reset when unmounting
    if (sequenceSizeFromState > 0 && !isLoading) {
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
    dispatch(setSequenceSessionBindingMode(false));
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
    setCurrentCard(cardsFromState[currentIndex]);
  }, [cardsFromState, currentIndex]);

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
