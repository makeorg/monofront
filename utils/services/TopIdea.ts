import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { QuestionApiService } from '@make.org/api/QuestionApiService';
import { TopIdeaType, TopIdeaDetailType } from '@make.org/types';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const orderByWeight = (topIdea1: TopIdeaType, topIdea2: TopIdeaType): number =>
  topIdea2.weight - topIdea1.weight;

const getTopIdeas = async (
  questionId: string,
  notFound: () => void = () => null
): Promise<TopIdeaType[] | null> => {
  try {
    const topIdeasResponse = await QuestionApiService.getTopIdeas(questionId);

    return (
      topIdeasResponse &&
      topIdeasResponse.data.questionTopIdeas.sort(orderByWeight)
    );
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      notFound();
      return null;
    }

    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getTopIdea = async (
  questionId: string,
  topIdeaId: string,
  notFound: () => void
): Promise<TopIdeaDetailType | null> => {
  try {
    const topIdeaResponse = await QuestionApiService.getTopIdea(
      questionId,
      topIdeaId
    );

    return topIdeaResponse && topIdeaResponse.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      notFound();
      return null;
    }
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

export const TopIdeaService = {
  getTopIdeas,
  getTopIdea,
};
