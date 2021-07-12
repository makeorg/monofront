import { useMemo, useEffect } from 'react';
import {
  CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
  CARD_TYPE_PROPOSAL,
} from '@make.org/utils/constants/card';
import { DemographicsTrackingService } from '@make.org/utils/services/DemographicsTracking';
import { Logger } from '@make.org/utils/services/Logger';
import { addQuestionToDemographics } from '@make.org/store/actions/sequence';
import { ProposalCardStateType } from '@make.org/types';
import { useAppContext } from '@make.org/store';

const AFTER_NB_VOTES = 2;

/**
 * Send demographic data when available in state
 *
 * See ExtraData card
 */
export const useSequenceExtraDataAutoSubmit = (
  questionSlug: string,
  cards: ProposalCardStateType[],
  currentIndex: number
): void => {
  const { dispatch, state } = useAppContext();
  const persistedDemographics = state.sequence.demographics;

  const triggeringIndexValue = useMemo(() => {
    // no cards
    if (!cards) {
      return null;
    }

    // has extra data card
    if (
      cards.find((fCard) => fCard.type === CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD)
    ) {
      return null;
    }

    // extra data already sent for question
    if (
      persistedDemographics?.questions.find((element) => element === questionSlug)
    ) {
      return null;
    }

    // find the proposal card after which to trigger
    const card = cards
      .filter(
        (fCard) => fCard.type === CARD_TYPE_PROPOSAL
          && !fCard.state.votes.some((vote) => vote.hasVoted === true)
      )
      .sort((a, b) => a.index - b.index)
      .splice(0, AFTER_NB_VOTES)
      .pop();

    if (card === undefined) {
      return null;
    }

    return parseInt(card.index, 10) + 1;
  }, [cards, persistedDemographics, questionSlug]);

  useEffect(() => {
    if (currentIndex === triggeringIndexValue) {
      if (!persistedDemographics?.type || !persistedDemographics?.value) {
        Logger.logError(
          `Unexpected error: no demographic values to send (questionId: ${questionSlug})`
        );
      }

      DemographicsTrackingService.track(
        persistedDemographics.type,
        persistedDemographics.value,
        {},
        () => dispatch(addQuestionToDemographics(questionSlug))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggeringIndexValue, currentIndex, persistedDemographics, questionSlug]);
};
