import React, { useState, FC } from 'react';
import { PersonalityCommentsType } from '@make.org/types';
import { opinionsVoteStaticParams } from '@make.org/utils/constants/opinions';
import { CommitmentVote } from './Vote';
import { CommitmentQualification } from './Qualification';
import { CommitmentForm } from './Form';
import { CommitmentPreview } from './Preview';

type Props = {
  userId: string;
  topIdeaId: string;
  comment: PersonalityCommentsType;
};

export const Commitment: FC<Props> = ({ userId, topIdeaId, comment }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [voteValue, setVoteValue] = useState(
    comment && comment.vote ? comment.vote : null
  );
  const [qualificationValue, setQualificationValue] = useState(
    comment && comment.qualification ? comment.qualification : null
  );
  const [firstComment, setFirstComment] = useState(
    comment && comment.comment1 ? comment.comment1 : ''
  );
  const [secondComment, setSecondComment] = useState(
    comment && comment.comment2 ? comment.comment2 : ''
  );
  const [thirdComment, setThirdComment] = useState(
    comment && comment.comment3 ? comment.comment3 : ''
  );
  const [preview, enbalePreview] = useState(false);

  const vote = (key: string) => {
    setVoteValue(key);
    setHasVoted(true);
  };

  const unvote = () => {
    setVoteValue(null);
    setHasVoted(false);
    setQualificationValue(null);
  };

  const handleQualification = (key: string) => {
    if (key === qualificationValue) {
      return setQualificationValue(null);
    }

    return setQualificationValue(key);
  };

  if (preview || comment) {
    return (
      <CommitmentPreview
        userId={userId}
        topIdeaId={topIdeaId}
        vote={voteValue}
        qualification={qualificationValue}
        firstComment={firstComment}
        secondComment={secondComment}
        thirdComment={thirdComment}
        handleCancel={() => enbalePreview(false)}
        preview={preview}
      />
    );
  }

  if (!hasVoted) {
    return <CommitmentVote vote={vote} />;
  }

  return (
    <>
      <CommitmentQualification
        voteValue={voteValue}
        unvote={unvote}
        qualifications={opinionsVoteStaticParams[voteValue].qualifications}
        qualificationValue={qualificationValue}
        handleQualification={handleQualification}
      />
      <CommitmentForm
        firstComment={firstComment}
        secondComment={secondComment}
        thirdComment={thirdComment}
        setFirstComment={setFirstComment}
        setSecondComment={setSecondComment}
        setThirdComment={setThirdComment}
        handleSubmit={() => enbalePreview(true)}
      />
    </>
  );
};
