import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import i18n from 'i18next';
import {
  trackVote,
  trackSequenceFirstVote,
  trackUnvote,
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
import {
  TopComponentContext,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import {
  vote as actionVote,
  unvote as actionUnvote,
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
  setDisplayNextButton?: Dispatch<SetStateAction<VoteType | undefined>>;
};

export const Vote: React.FC<Props> = ({
  proposal,
  votes,
  proposalKey,
  setDisplayNextButton = undefined,
  index = 0,
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
  const votedProposals = votedProposalIds[proposal.question.slug];
  const hasVotedProposals = votedProposals && votedProposals.length > 0;
  const isFirstSequenceVote =
    !hasVotedProposals &&
    contextType === TopComponentContextValue.getSequenceProposal();

  let timeout: NodeJS.Timeout;
  const wait = async (ms: number) =>
    new Promise(resolve => {
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
    setUserVote(undefined);
    dispatch(
      actionUnvote(proposal, newVotes, contextType, dispatch, state.sequence)
    );
    await trackUnvote(proposalId, voteKey, index, contextType);
    if (setDisplayNextButton) {
      setDisplayNextButton(undefined);
    }
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
    const updatedVote = updatedVotes.find(newVote => newVote.hasVoted === true);
    setCurrentVotes(updatedVotes);
    setUserVote(updatedVote);
    dispatch(
      actionVote(proposal, updatedVotes, contextType, dispatch, state.sequence)
    );
    await trackVote(proposalId, voteKey, index, contextType);
    if (isFirstSequenceVote) {
      trackSequenceFirstVote(proposalId, voteKey, index);
      dispatch(dismissNotification(NOTIF.FIRST_VOTE_TIP_MESSAGE));
      dispatch(clearNotificationTip());
    }
    if (setDisplayNextButton) {
      setDisplayNextButton(updatedVote);
    }
    stopPending();
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

  useEffect(
    () => {
      if (!setDisplayNextButton) {
        return;
      }

      if (userVote && votedKey) {
        setDisplayNextButton(userVote);
        return;
      }

      setDisplayNextButton(undefined);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userVote, votedKey]
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
      <VoteContainerStyle>
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
      </VoteContainerStyle>
    );
  }

  return (
    <VoteContainerStyle>
      <ScreenReaderItemStyle as="p">
        {i18n.t('vote.intro_title')}
      </ScreenReaderItemStyle>
      <VoteWrapperStyle>
        {voteStaticParamsKeys.map((voteKey: string) => (
          <VoteButtonWrapperStyle as="li" key={getVoteKey(voteKey, proposalId)}>
            <VoteButton
              voteKey={voteKey}
              buttonClass={getVoteButtonClass(
                voteKey,
                animateVoteKey,
                contextType
              )}
              displayPending={getSameKey(pendingVoteKey, voteKey)}
              handleVote={() => handleVote(voteKey)}
              animateVote={getSameKey(animateVoteKey, voteKey)}
            />
          </VoteButtonWrapperStyle>
        ))}
      </VoteWrapperStyle>
    </VoteContainerStyle>
  );
};
