import React from 'react';
import { VoteType } from '@make.org/types';
import { VoteResult } from '@make.org/components/Vote/Result';
import { SpaceBetweenColumnStyle } from '@make.org/ui/elements/FlexElements';
import { QualificationButton } from '@make.org/components/Qualification/Button';
import { VoteResultStyle } from '@make.org/components/Vote/Result/style';

type Props = {
  /** Proposal's Id */
  proposalId: string;
  /** Array of votes */
  votes: VoteType[];
  /** Voted key property */
  votedKey: string;
  /** Proposal's Key */
  proposalKey: string;
  /** When waiting response from API */
  isPending?: boolean;
  /** Disable click on unvote button */
  disableClick?: boolean;
  /** Boolean to disable tooltip on button hover event */
  withTooltip?: boolean;
  /** handle click on vote */
  handleVote?: () => void;
};

export const VoteResultElement: React.FC<Props> = ({
  proposalId,
  votes,
  votedKey,
  proposalKey,
  isPending = false,
  disableClick = false,
  withTooltip = true,
  handleVote = () => null,
}) => {
  const resultVote = votes.find(vote => vote.voteKey === votedKey);

  if (!resultVote) {
    return null;
  }

  return (
    <VoteResultStyle>
      <VoteResult
        proposalId={proposalId}
        votes={votes}
        votedKey={votedKey}
        handleUnvote={handleVote}
        pending={isPending}
        disableClick={disableClick}
        withTooltip={withTooltip}
      />
      <SpaceBetweenColumnStyle>
        {resultVote.qualifications.map(qualification => (
          <QualificationButton
            key={`vote_result_${proposalId}_qualifcation_${qualification.qualificationKey}`}
            qualification={qualification}
            votedKey={votedKey}
            proposalId={proposalId}
            proposalKey={proposalKey}
            disableClick
          />
        ))}
      </SpaceBetweenColumnStyle>
    </VoteResultStyle>
  );
};
