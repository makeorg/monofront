import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { getLanguageFromCountryCode } from '@make.org/utils/helpers/countries';
import { isInProgress } from '@make.org/utils/helpers/date';
import { logError } from './helpers/ssr.helper';
import { transformExtraSlidesConfigFromQuery } from './helpers/query.helper';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';

export const sequenceRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { questionSlug, country } = req.params;
  const { introCard } = req.query;
  const { pushProposal } = req.query;
  const noIntroCard = introCard === (false || 'false');
  const noPushProposal = pushProposal === (false || 'false');

  const language = getLanguageFromCountryCode(country);
  const initialState = createInitialState();

  const notFound = () => {
    logError({
      message: `Question not found on sequenceRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };
  const unexpectedError = () => {
    logError({
      message: `Unexpected Error on sequenceRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  const question = await QuestionService.getQuestion(
    questionSlug,
    country,
    language,
    notFound,
    unexpectedError
  );

  if (!question) {
    return reactRender(req, res.status(404), initialState);
  }

  if (!isInProgress(question) && !question.displayResults) {
    return res.redirect(question.aboutUrl);
  }

  const { sequenceConfig } = question;
  const questionModified = {
    ...question,
    sequenceConfig: transformExtraSlidesConfigFromQuery(
      sequenceConfig,
      noIntroCard,
      noPushProposal
    ),
  };

  initialState.currentQuestion = questionSlug;
  initialState.questions = {
    [questionSlug]: {
      question: questionModified,
    },
  };
  updateTrackingQuestionParam(questionModified);

  return reactRender(req, res, initialState);
};
