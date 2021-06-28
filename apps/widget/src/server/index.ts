import { Question } from '../store/reducers/types';

const ENDPOINT = 'https://api.preprod.makeorg.tech/sequences/standard/';

export const getQuestion = async (questionId: string): Promise<Question> => {
  const result = await fetch(`${ENDPOINT}${questionId}`);
  const data = await result.json();
  return data;
};
