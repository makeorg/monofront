/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ProposalCardType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { CARD } from '@make.org/types/enums';
import {
  disableFirstProposal,
  incrementSequenceIndex,
} from '@make.org/store/actions/sequence';
import {
  trackClickNextCard,
  trackClickNextOnLastProposal,
} from '@make.org/utils/services/Tracking';
import { Vote } from '../../Vote';
import { ProposalAuthor } from '../../Proposal/Author';
import {
  SequenceNextCardButtonStyle,
  SequenceProposalStyle,
  SequenceProposalWrapperStyle,
  SequenceProposalAndVoteWrapperStyle,
  SequenceNextWrapperStyle,
} from './style';
import { Tip } from '../../Notifications/Tip';

type Props = {
  /** Proposal card */
  proposalCard: ProposalCardType;
};

/**
 * Handles Proposal Card Business Logic
 */
export const ProposalCard: React.FC<Props> = ({ proposalCard }) => {
  const { state, dispatch } = useAppContext();

  const [proposal, setProposal] = useState(proposalCard.configuration.proposal);
  const [index, setIndex] = useState(proposalCard.index);
  const { cards = [] } = state.sequence || {};
  const { votes = [] } = cards[index]?.state ? cards[index].state : {};
  const votedProposal = votes.find(vote => vote.hasVoted === true);
  const [displayNextButton, setDisplayNextButton] = useState(votedProposal);

  const getLastCardIndex = () => {
    const allProposals = cards.filter(
      card => card.type === CARD.CARD_TYPE_PROPOSAL
    );
    const lastCard = allProposals.pop();
    if (lastCard) {
      return lastCard.index;
    }
    return 0;
  };

  const [isLastProposalCard, setIsLastProposalCard] = useState(
    proposalCard.index === getLastCardIndex()
  );
  const { loadFirstProposal } = state.sequence;
  const lastProposalOfSequence = isLastProposalCard && !loadFirstProposal;

  const { votedProposalIds } = state.sequence;
  const votedProposals = votedProposalIds[proposal.question.slug];
  const hasVotedProposals = votedProposals && votedProposals.length > 0;
  const isFirstSequenceVote = !hasVotedProposals;

  const goToNextCard = () => {
    dispatch(incrementSequenceIndex());
    if (lastProposalOfSequence) {
      return trackClickNextOnLastProposal();
    }
    return trackClickNextCard();
  };

  const handleFirstProposalDisabling = () => {
    dispatch(disableFirstProposal());
  };

  useEffect(() => {
    setProposal(proposalCard.configuration.proposal);
    setIndex(proposalCard.index);
    setIsLastProposalCard(proposalCard.index === getLastCardIndex());
  }, [proposalCard, cards]);

  return (
    <SequenceProposalWrapperStyle>
      <ProposalAuthor proposal={proposal} />
      <SequenceProposalAndVoteWrapperStyle>
        <ScreenReaderItemStyle>
          {i18n.t('proposal_card.content')}
        </ScreenReaderItemStyle>
        <SequenceProposalStyle lang={proposal.question.language}>
          {proposal.content}
        </SequenceProposalStyle>
        {isFirstSequenceVote && <Tip />}
        <Vote
          proposal={proposal}
          votes={votes}
          proposalKey={proposal.proposalKey}
          index={index}
          setDisplayNextButton={setDisplayNextButton}
        />
      </SequenceProposalAndVoteWrapperStyle>
      <SequenceNextWrapperStyle>
        {displayNextButton && (
          <SequenceNextCardButtonStyle
            onClick={
              loadFirstProposal ? handleFirstProposalDisabling : goToNextCard
            }
            id={`next-button-${proposal.id}`}
            data-cy-button="next-proposal"
          >
            {lastProposalOfSequence
              ? i18n.t('proposal_card.validate')
              : i18n.t('proposal_card.next')}
          </SequenceNextCardButtonStyle>
        )}
      </SequenceNextWrapperStyle>
    </SequenceProposalWrapperStyle>
  );
};
