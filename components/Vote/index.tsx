import React, { useContext, useEffect, useState } from 'react';
import { i18n } from '@make.org/utils/i18n';
import {
  trackVote,
  trackFirstVote,
  trackUnvote,
} from '@make.org/utils/services/Tracking';
import { VoteType, ProposalType, StateRoot } from '@make.org/types';
import {
  getVoteKey,
  getSameKey,
  getVoteButtonClass,
  updateAndGetVotes,
} from '@make.org/utils/helpers/vote';
import { VoteService } from '@make.org/utils/services/Vote';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { voteStaticParamsKeys } from '@make.org/utils/constants/vote';
import {
  TopComponentContext,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import {
  vote as actionVote,
  unvote as actionUnvote,
} from '@make.org/store/actions/sequence';
import { Tip } from '@make.org/ui/components/Notifications/Tip';
import {
  clearNotificationTip,
  dismissNotification,
  displayNotificationTip,
} from '@make.org/store/actions/notifications';
import { useAppContext } from '@make.org/store';
import { FIRST_VOTE_TIP_MESSAGE } from '@make.org/utils/constants/notifications';
import { Qualification } from '../Qualification';
import { VoteResult } from './Result';
import {
  VoteContainerStyle,
  VoteWrapperStyle,
  VoteButtonWrapperStyle,
} from './style';
import { VoteButton } from './Button/Vote';

type Props = {
  /** Proposal's Id */
  proposal: ProposalType;
  /** Question Slug */
  votes: VoteType[];
  /** String containing the hash generate api side for security purpose */
  proposalKey: string;
  /** Index of the card */
  index: number;
  /** Specific design for new sequence */
  isSequence?: boolean;
};

export const Vote: React.FC<Props> = ({
  proposal,
  votes,
  proposalKey,
  index = 0,
  isSequence,
}) => {
  const { dispatch } = useAppContext();
  const { id: proposalId } = proposal;
  const contextType = useContext(TopComponentContext);
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [userVote, setUserVote] = useState(
    currentVotes && currentVotes.find((vote) => vote.hasVoted === true)
  );
  const [votedKey, setVotedKey] = useState(userVote ? userVote.voteKey : '');
  const [pending, setPending] = useState(false);
  const [animateVoteKey, setAnimatedVoteKey] = useState('');
  const [pendingVoteKey, setPendingVoteKey] = useState('');
  const { votedProposalIds } = useSelector(
    (state: StateRoot) => state.sequence
  );
  const isFirstSequenceVote = contextType === TopComponentContextValue.getSequenceProposal()
    && (votedProposalIds[proposal.question.slug] || []).length === 0;

  let timeout;
  const wait = async (ms: number) => new Promise((resolve) => {
    timeout = setTimeout(resolve, ms);
  });
  const clearWait = async () => {
    clearTimeout(timeout);
  };

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
    setUserVote(null);
    dispatch(actionUnvote(proposal, newVotes, contextType));
    await onUnvote();
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
    setUserVote(updatedVotes.find((newVote) => newVote.hasVoted === true));
    dispatch(actionVote(proposal, updatedVotes, contextType));
    await onVote();
    await trackVote(proposalId, voteKey, index, contextType);
    if (isFirstSequenceVote) {
      trackFirstVote(proposalId, voteKey, index);
      dispatch(dismissNotification(FIRST_VOTE_TIP_MESSAGE));
      dispatch(clearNotificationTip());
    }
    stopPending();
  };

  useEffect(() => {
    const stateUserVote = votes && votes.find((vote) => vote.hasVoted === true);
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

  useEffect(() => {
    if (isFirstSequenceVote) {
      dispatch(displayNotificationTip(FIRST_VOTE_TIP_MESSAGE, undefined, true));

      return () => {
        dispatch(clearNotificationTip());
      };
    }
    return null;
  } [dispatch, isFirstSequenceVote]);

  if (userVote && votedKey) {
    return (
      <VoteContainerStyle isSequence={isSequence}>
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
          pendingVote={pending}
        />
      </VoteContainerStyle>
    );
  }

  return (
    <>
      {isFirstSequenceVote && <Tip isFirstSequenceVote={isFirstSequenceVote} />}
      <VoteContainerStyle isSequence={isSequence}>
        <ScreenReaderItemStyle as="p">
          {i18n.t('vote.intro_title')}
        </ScreenReaderItemStyle>
        <VoteWrapperStyle>
          {voteStaticParamsKeys.map((voteKey: string) => (
            <VoteButtonWrapperStyle
              as="li"
              key={getVoteKey(voteKey, proposalId)}
            >
              <VoteButton
                voteKey={voteKey}
                buttonClass={getVoteButtonClass(
                  voteKey,
                  animateVoteKey,
                  pendingVoteKey,
                  false
                )}
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
