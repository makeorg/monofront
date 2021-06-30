import { Proposal } from '@make.org/types';

const ENDPOINT = 'https://api.preprod.makeorg.tech/sequences/standard/';
export const getQuestion = async (
  questionId: string
): Promise<{ proposals: Proposal[] }> => {
  const result = await fetch(`${ENDPOINT}${questionId}`);
  const { proposals } = await result.json();
  return proposals;
};
