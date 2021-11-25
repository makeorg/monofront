import React, { useContext, useEffect, useState } from 'react';
import i18n from 'i18next';
import {
  trackVote,
  trackFirstVote,
  trackUnvote,
  trackClickNextOnLastProposal,
  trackClickNextCard,
} from '@make.org/utils/services/Tracking';
import { VoteType, ProposalType } from '@make.org/types';
import {
  getVoteKey,
  getSameKey,
  getVoteButtonClass,
  updateAndGetVotes,
} from '@make.org/utils/helpers/vote';
import { VoteService } from '@make.org/utils/services/Vote';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { voteStaticParamsKeys } from '@make.org/utils/constants/vote';
import { TopComponentContext } from '@make.org/store/topComponentContext';
import {
  vote as actionVote,
  unvote as actionUnvote,
  incrementSequenceIndex,
  disableFirstProposal,
} from '@make.org/store/actions/sequence';
import {
  clearNotificationTip,
  dismissNotification,
  displayNotificationTip,
} from '@make.org/store/actions/notifications';
import { useAppContext } from '@make.org/store';
import { NOTIF } from '@make.org/types/enums';
import { Qualification } from '../Qualification';
import { VoteResult } from './Result';
import {
  VoteContainerStyle,
  VoteWrapperStyle,
  VoteButtonWrapperStyle,
} from './style';
import { VoteButton } from './Button/Vote';
import { Tip } from '../Notifications/Tip';
import { SequenceNextCardButtonStyle } from '../Sequence/Cards/style';

type Props = {
  /** Proposal's Id */
  proposal: ProposalType;
  /** Question Slug */
  votes: VoteType[];
  /** String containing the hash generate api side for security purpose */
  proposalKey: string;
  /** Index of the card */
  index?: number;
  /** Specific boolean sequence */
  isSequence?: boolean;
  /** Specific boolean for last sequence */
  isLastProposal?: boolean;
};

export const Vote: React.FC<Props> = ({
  proposal,
  votes,
  proposalKey,
  index = 0,
  isSequence = false,
  isLastProposal = false,
}) => {
  const { dispatch, state } = useAppContext();
  const { id: proposalId } = proposal;
  const contextType = useContext(TopComponentContext);
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [userVote, setUserVote] = useState(
    currentVotes && currentVotes.find(vote => vote.hasVoted === true)
  );
  const [votedKey, setVotedKey] = useState(userVote ? userVote.voteKey : '');
  const [pending, setPending] = useState(false);
  const [animateVoteKey, setAnimatedVoteKey] = useState('');
  const [pendingVoteKey, setPendingVoteKey] = useState('');
  const { votedProposalIds } = state.sequence;
  const { source } = state.appConfig;
  const { loadFirstProposal } = state.sequence;
  const isWidget = source === 'widget';
  const votedProposals = votedProposalIds[proposal.question.slug];
  const hasVotedProposals = votedProposals && votedProposals.length > 0;
  const isFirstSequenceVote = isSequence && !hasVotedProposals;
  const lastProposalOfSequence =
    isSequence && isLastProposal && !loadFirstProposal;

  let timeout: NodeJS.Timeout;
  const wait = async (ms: number) =>
    new Promise(resolve => {
      timeout = setTimeout(resolve, ms);
    });
  const clearWait = async () => {
    clearTimeout(timeout);
  };

  let className = '';

  if (!!isSequence && isWidget) {
    className = 'sequence widget';
  }
  if (isSequence) {
    className = 'sequence';
  }
  if (isWidget && isFirstSequenceVote) {
    className = 'widgetFirstVote';
  }

  if (isWidget && !isFirstSequenceVote) {
    className = 'widget';
  }

  const stopPending = () => {
    clearWait();
    if (pending) {
      wait(500);
    }
    setPending(false);
    setAnimatedVoteKey('');
    setPendingVoteKey('');
  };

  const handleUnvote = async (voteKey: string) => {
    setPendingVoteKey(voteKey);
    setPending(true);

    const unvote = await VoteService.unvote(proposalId, voteKey, proposalKey);
    if (!unvote) {
      stopPending();
      return;
    }
    setVotedKey('');
    const newVotes = updateAndGetVotes(currentVotes, unvote);
    setCurrentVotes(newVotes);
    setUserVote(undefined);
    dispatch(
      actionUnvote(proposal, newVotes, contextType, dispatch, state.sequence)
    );
    await trackUnvote(proposalId, voteKey, index, contextType);
    stopPending();
  };

  const handleVote = async (voteKey: string) => {
    setAnimatedVoteKey(voteKey);
    await wait(500);
    setPendingVoteKey(voteKey);
    wait(750).then(() => {
      setAnimatedVoteKey('');
      setPending(true);
    });

    const vote = await VoteService.vote(proposalId, voteKey, proposalKey);
    if (!vote) {
      stopPending();
      return;
    }
    setVotedKey(vote.voteKey);
    const updatedVotes = updateAndGetVotes(currentVotes, vote);
    setCurrentVotes(updatedVotes);
    setUserVote(updatedVotes.find(newVote => newVote.hasVoted === true));
    dispatch(
      actionVote(proposal, updatedVotes, contextType, dispatch, state.sequence)
    );
    await trackVote(proposalId, voteKey, index, contextType);
    if (isFirstSequenceVote) {
      trackFirstVote(proposalId, voteKey, index);
      dispatch(dismissNotification(NOTIF.FIRST_VOTE_TIP_MESSAGE));
      dispatch(clearNotificationTip());
    }
    stopPending();
  };

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
    const stateUserVote = votes && votes.find(vote => vote.hasVoted === true);
    setCurrentVotes(votes);
    setUserVote(stateUserVote);
    setVotedKey(stateUserVote ? stateUserVote.voteKey : '');
  }, [votes]);

  useEffect(
    () => () => {
      clearWait();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect((): any => {
    if (isFirstSequenceVote) {
      dispatch(
        displayNotificationTip(NOTIF.FIRST_VOTE_TIP_MESSAGE, undefined, true)
      );

      return (): void => {
        dispatch(clearNotificationTip());
      };
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (userVote && votedKey) {
    return (
      <VoteContainerStyle className={className}>
        <VoteResult
          proposalId={proposalId}
          votes={currentVotes}
          votedKey={votedKey}
          handleUnvote={async () => handleUnvote(votedKey)}
          pending={pending}
        />
        <Qualification
          proposalId={proposalId}
          qualifications={userVote.qualifications}
          proposalKey={proposalKey}
          votedKey={votedKey}
          index={index}
        />
        {isSequence && (
          <SequenceNextCardButtonStyle
            onClick={
              loadFirstProposal ? handleFirstProposalDisabling : goToNextCard
            }
            id={`next-button-${proposal.id}`}
            data-cy-button="next-proposal"
            className={className}
          >
            {lastProposalOfSequence
              ? i18n.t('proposal_card.validate')
              : i18n.t('proposal_card.next')}
          </SequenceNextCardButtonStyle>
        )}
      </VoteContainerStyle>
    );
  }

  return (
    <>
      {isFirstSequenceVote && <Tip isFirstSequenceVote={isFirstSequenceVote} />}
      <VoteContainerStyle className={className}>
        <ScreenReaderItemStyle as="p">
          {i18n.t('vote.intro_title')}
        </ScreenReaderItemStyle>
        <VoteWrapperStyle isWidget={isWidget}>
          {voteStaticParamsKeys.map((voteKey: string) => (
            <VoteButtonWrapperStyle
              as="li"
              key={getVoteKey(voteKey, proposalId)}
            >
              <VoteButton
                voteKey={voteKey}
                buttonClass={getVoteButtonClass(voteKey, animateVoteKey, false)}
                displayPending={getSameKey(pendingVoteKey, voteKey)}
                handleVote={() => handleVote(voteKey)}
                animateVote={getSameKey(animateVoteKey, voteKey)}
              />
            </VoteButtonWrapperStyle>
          ))}
        </VoteWrapperStyle>
      </VoteContainerStyle>
    </>
  );
};
