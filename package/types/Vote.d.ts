import { QualificationType } from './Qualification';

export type VoteType = {
  voteKey: string;
  count: number;
  score: number;
  qualifications: QualificationType[];
  hasVoted: boolean;
  agree?: any;
  disagree?: any;
  neutral?: any;
};
