import { useMemo, useEffect } from 'react';
import { DemographicsTrackingService } from '@make.org/utils/services/DemographicsTracking';
import { Logger } from '@make.org/utils/services/Logger';
import { addQuestionToDemographics } from '@make.org/store/actions/sequence';
import { ProposalCardType, SequenceCardType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { CARD } from '@make.org/types/enums';

const AFTER_NB_VOTES = 2;

/**
 * Send demographic data when available in state
 *
 * See ExtraData card
 */
export const useSequenceExtraDataAutoSubmit = (
  questionSlug: string,
  cards: ProposalCardType[] | SequenceCardType[],
  currentIndex: number
): void => {
  const { dispatch, state } = useAppContext();
  const { demographics: persistedDemographics } = state.sequence || {};

  const triggeringIndexValue: number | null = useMemo(() => {
    // no cards
    if (!cards) {
      return null;
    }

    // has extra data card
    if (
      cards.find(
        fCard => fCard.type === CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD
      )
    ) {
      return null;
    }

    // extra data already sent for question
    if (
      persistedDemographics?.questions.find(element => element === questionSlug)
    ) {
      return null;
    }

    // find the proposal card after which to trigger
    const card = cards
      .filter(
        fCard =>
          fCard.type === CARD.CARD_TYPE_PROPOSAL &&
          !fCard.state?.votes.some(vote => !!vote && vote.hasVoted === true)
      )
      .sort((a, b) => a.index - b.index)
      .splice(0, AFTER_NB_VOTES)
      .pop();

    if (card === undefined) {
      return null;
    }
    if (typeof card.index === 'string') {
      return parseInt(card.index, 10) + 1;
    }
    return card.index + 1;
  }, [cards, persistedDemographics, questionSlug]);

  useEffect(() => {
    if (currentIndex === triggeringIndexValue) {
      const { type = '', value = '' } = persistedDemographics || {};
      if (!type || !value) {
        Logger.logError(
          `Unexpected error: no demographic values to send (questionId: ${questionSlug})`
        );
      }

      DemographicsTrackingService.track(type, value, {}, () =>
        dispatch(addQuestionToDemographics(questionSlug))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggeringIndexValue, currentIndex, persistedDemographics, questionSlug]);
};
