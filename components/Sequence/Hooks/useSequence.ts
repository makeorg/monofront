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
import { useSequenceTracking } from './useSequenceTracking';
import { useSequenceVoteOnlyNotification } from './useSequenceVoteOnlyNotification';
import { useSequenceExtraDataAutoSubmit } from './useSequenceExtraDataAutoSubmit';
import { useSequenceQueryParams } from './useSequenceQueryParams';

// REDUX REST TO DO
import { type StateRoot } from 'Shared/store/types';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthentication } from 'Shared/store/selectors/user.selector';
import {
  resetSequenceIndex,
  setSequenceIndex,
  loadSequenceCards,
  resetSequenceVotedProposals,
} from 'Shared/store/actions/sequence';

/**
 * Renders Sequence component with Intro / Push Proposal / Sign Up & Proposal Cards
 */
export const useSequence = (
  question: QuestionType,
  isStandardSequence: boolean,
  executeStartSequence: (questionId, votedIds) => ProposalType[]
) => {
  // Dispatch
  const dispatch = useDispatch();

  // StateRoot
  const { country } = useSelector((state: StateRoot) => state.appConfig);
  const { hasProposed } = useSelector((state: StateRoot) => state.proposal);
  const { isLoggedIn } = useSelector((state: StateRoot) =>
    selectAuthentication(state)
  );
  const persistedDemographics = useSelector(
    (state: StateRoot) => state.sequence.demographics
  );
  const { isPushProposal, votedProposalIdsOfQuestion, currentIndex, cards } =
    useSelector((state: StateRoot) => {
      const {
        cards: sCards,
        currentIndex: sCurrentIndex,
        votedProposalIds: sVotedProposalIds,
      } = state.sequence;

      const votedProposalIdsOfQuestionValue =
        (sVotedProposalIds && sVotedProposalIds[question?.slug]) || [];

      return {
        cards: sCards,
        currentIndex: sCurrentIndex || 0,
        votedProposalIdsOfQuestion: votedProposalIdsOfQuestionValue,
        isPushProposal: !!(
          sCards &&
          sCards[sCurrentIndex]?.type === CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL
        ),
      };
    });

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
  const { firstProposal, introCardParam, pushProposalParam } =
    useSequenceQueryParams();
  useSequenceExtraDataAutoSubmit(question.slug, cards, currentIndex);

  // Other
  const isFR = country === 'FR';

  // scroll to top
  useEffect(() => {
    scrollToTop();
  }, []);

  // load sequence data
  useEffect(async () => {
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
