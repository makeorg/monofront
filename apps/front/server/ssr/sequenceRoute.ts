import { updateTrackingQuestionParam } from '@make.org/store/middleware/question';
import { Request, Response } from 'express';
import { initialState } from '@make.org/store/initialState';
import { getLanguageFromCountryCode } from '@make.org/utils/helpers/countries';
import { isInProgress } from '@make.org/utils/helpers/date';
import { transformExtraSlidesConfigFromQuery } from './helpers/query.helper';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';
import { logError } from './helpers/ssr.helper';

export const sequenceRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { questionSlug, country } = req.params;
  const introCard: string = req.query.introCard as string;
  const pushProposal: string = req.query.pushProposal as string;
  const noIntroCard = JSON.parse(introCard) === false;
  const noPushProposal = JSON.parse(pushProposal) === false;

  const language = getLanguageFromCountryCode(country);

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
    return res.redirect(JSON.stringify(question.aboutUrl));
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