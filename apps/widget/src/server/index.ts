import { Proposal } from '@make.org/types';

const ENDPOINT = 'https://api.preprod.makeorg.tech/sequences/standard/';
export const getQuestion = async (questionId: string): Promise<Proposal[]> => {
  const result = await fetch(`${ENDPOINT}${questionId}`);
  const data = await result.json();
  return data;
};
