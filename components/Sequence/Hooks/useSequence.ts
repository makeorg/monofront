/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  buildCards,
  findIndexOfFirstUnvotedCard,
} from '@make.org/utils/helpers/sequence';
import { SequenceCardType, QuestionType, ProposalType } from '@make.org/types';
import { searchFirstUnvotedProposal } from '@make.org/utils/helpers/proposal';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL } from '@make.org/utils/constants/card';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import {
  resetSequenceIndex,
  setSequenceIndex,
  loadSequenceCards,
  resetSequenceVotedProposals,
} from '@make.org/store/actions/sequence';
import { useAppContext } from '@make.org/store';
import { useSequenceTracking } from './useSequenceTracking';
import { useSequenceVoteOnlyNotification } from './useSequenceVoteOnlyNotification';
import { useSequenceExtraDataAutoSubmit } from './useSequenceExtraDataAutoSubmit';
import { useSequenceQueryParams } from './useSequenceQueryParams';

type ReturnFunctionType = {
  withProposalButton: boolean
  country: string
  isLoading: boolean
  currentCard: SequenceCardType
}
type ExecuteStartSequence = (questionId: string, votedIds: string[]) => Promise<ProposalType[]>

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
  const { appConfig = {}, proposal = {}, sequence = {} } = state;
  const { country } = appConfig;
  const { hasProposed } = proposal;
  const { isLoggedIn } = selectAuthentication(state);
  const persistedDemographics = sequence && sequence.demographics;
  const {
    cards: sCards,
    currentIndex: sCurrentIndex,
    votedProposalIds: sVotedProposalIds,
  } = sequence;

  const isPushProposal = !!(
    sCards
    && sCards[sCurrentIndex]?.type === CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL
  );
  const votedProposalIdsOfQuestion = (sVotedProposalIds && sVotedProposalIds[question?.slug]) || [];
  const currentIndex = sCurrentIndex || 0;
  const cards = sCards;

  // State
  const [currentCard, setCurrentCard] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [withProposalButton, setWithProposalButton] = useState(
    !!question?.canPropose
  );
  const [sequenceProposals, setSequenceProposals] = useState([]);

  // Sequence hooks
  useSequenceTracking();
  useSequenceVoteOnlyNotification(question);
  const { firstProposal, introCardParam, pushProposalParam } = useSequenceQueryParams();
  useSequenceExtraDataAutoSubmit(question.slug, cards, currentIndex);

  // Other
  const isFR = country === 'FR';

  // scroll to top
  useEffect(() => {
    scrollToTop();
  }, []);

  // load sequence data
  useEffect(() => {
    const loadSequenceData = async () => {
      const votedIds = firstProposal
        ? [firstProposal, ...votedProposalIdsOfQuestion]
        : votedProposalIdsOfQuestion;

      if (question) {
        const proposals = await executeStartSequence(
          question.questionId,
          votedIds
        );
        if (proposals) {
          setSequenceProposals(proposals);
        }
      }
      dispatch(resetSequenceIndex()); // @toDo : check if realy needed - see useEffect init sequence index

      setLoading(false);
    };
    loadSequenceData();
  }, [question, firstProposal, isLoggedIn, hasProposed]);

  // build cards
  useEffect(() => {
    if (!question || !sequenceProposals || !sequenceProposals.length) {
      return;
    }
    const withDemographicsCard = isFR && !persistedDemographics?.type;

    const buildedCards: SequenceCardType[] = buildCards(
      sequenceProposals,
      question.sequenceConfig,
      hasProposed,
      question.canPropose,
      isStandardSequence,
      introCardParam,
      pushProposalParam,
      withDemographicsCard
    );

    dispatch(loadSequenceCards(buildedCards));
  }, [hasProposed, sequenceProposals]);

  // init sequence index
  useEffect(() => {
    const indexOfFirstUnvotedCard: number = findIndexOfFirstUnvotedCard(
      searchFirstUnvotedProposal(sequenceProposals),
      cards,
      currentIndex
    );
    dispatch(setSequenceIndex(indexOfFirstUnvotedCard));
  }, [cards]);

  // set current card
  useEffect(() => {
    if (!cards.length) {
      return;
    }
    setCurrentCard(cards[currentIndex]);
    setWithProposalButton(question && question.canPropose);
    if (isPushProposal) {
      setWithProposalButton(false);
    }
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
    withProposalButton,
    country,
    isLoading,
    currentCard,
  };
};
