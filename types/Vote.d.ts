import { QualificationType } from './Qualification';

export type VoteType = {
  voteKey: string;
  count: number;
  qualifications: QualificationType[];
  hasVoted: boolean;
};
