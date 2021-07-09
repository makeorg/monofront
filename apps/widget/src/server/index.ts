import { ProposalType, QuestionType } from '@make.org/types';

const ENDPOINT_PROPOSALS = (questionId : string): string => `https://api.preprod.makeorg.tech/sequences/standard/${questionId}`;
const ENDPOINT_QUESTION = (questionId : string): string => `https://api.preprod.makeorg.tech/questions/${questionId}/details`;

export const getQuestion = async (
  questionId: string
): Promise<QuestionType> => {
  const questionResult = await fetch(ENDPOINT_QUESTION(questionId));
  const question = await questionResult.json();
  return question;
};

export const getProposals = async (
  questionId: string
): Promise<ProposalType[]> => {
  const proposalsResult = await fetch(ENDPOINT_PROPOSALS(questionId));
  const { proposals } = await proposalsResult.json();
  return proposals;
};
