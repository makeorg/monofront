import { QuestionType } from './Question';
import { TopIdeaType } from './TopIdea';

export type PersonalityCommentsType = {
  id: string;
  topIdeaId: string;
  personalityId: string;
  comment1: string;
  comment2: string;
  comment3: string;
  vote: string;
  qualification: string;
};

export type PersonalityOpinionType = {
  question: QuestionType;
  topIdea: TopIdeaType;
  comment: PersonalityCommentsType;
};

export type PersonalityProfileType = {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  description: string;
  optInNewsletter: boolean;
  website: string;
  politicalParty: string;
  gender: string;
};
