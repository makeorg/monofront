import {
  TagType,
  PersonalityType,
  ReducerAction,
  Dispatch,
  QuestionType,
} from '@make.org/types';
import { QuestionService } from '@make.org/utils/services/Question';
import {
  LOAD_QUESTION,
  QUESTION_PERSONALITIES_LOAD,
  QUESTION_POPULAR_TAGS_LOAD,
  GET_QUESTION,
} from '../../actionTypes';

export const loadQuestion = (question: QuestionType): ReducerAction => ({
  type: LOAD_QUESTION,
  payload: { question },
});

export const loadPopularTags = (
  questionSlug: string,
  popularTags: TagType[]
): ReducerAction => ({
  type: QUESTION_POPULAR_TAGS_LOAD,
  payload: { questionSlug, popularTags },
});

export const loadQuestionPersonalities = (
  questionSlug: string,
  personalities: PersonalityType[]
): ReducerAction => ({
  type: QUESTION_PERSONALITIES_LOAD,
  payload: { questionSlug, personalities },
});

export const fechQuestionPersonalities =
  (
    questionId: string,
    questionSlug: string,
    personalityRole?: string,
    limit?: number,
    skip?: number
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    const response = await QuestionService.getQuestionPersonalities(
      questionId,
      personalityRole,
      limit,
      skip
    );

    const results = response ? response.results : [];
    return dispatch(loadQuestionPersonalities(questionSlug, results));
  };

export const getQuestionDetails = (
  question: QuestionType
): {
  type: string;
  payload: QuestionType;
} => ({
  type: GET_QUESTION,
  payload: question,
});
