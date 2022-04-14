import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { getLanguageFromCountryCode } from '@make.org/utils/helpers/countries';
import { isInProgress } from '@make.org/utils/helpers/date';
import { getLoggerInstance } from '@make.org/utils/helpers/logger';
import {
  addDemographicsToSequenceConfig,
  buildCards,
} from '@make.org/utils/helpers/sequence';
import { COOKIE, NOTIF, SEQUENCE } from '@make.org/types/enums';
import { Cookie } from 'universal-cookie';
import { sequence_state } from '@make.org/store/reducers/sequence';
import { transformExtraSlidesConfigFromQuery } from './helpers/query.helper';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';

export const sequenceByKindRoute = async (
  req: Request & Cookie,
  res: Response
): Promise<void> => {
  const { questionSlug, country } = req.params;
  const { introCard } = req.query;
  const { pushProposal } = req.query;
  const withIntroCardParam = introCard?.toLowerCase() !== 'false';
  const withPushProposalParam = pushProposal?.toLowerCase() !== 'false';

  const language = getLanguageFromCountryCode(country);
  const initialState = createInitialState();
  const logger = getLoggerInstance();

  // get cookies for session and demographics
  const sessionIdFromCookie = req.universalCookies.get(COOKIE.SESSION_ID);
  const demographicsCookie = req.universalCookies.get(COOKIE.DEMOGRAPHICS);

  const notFound = () => {
    logger.logError({
      message: `Question not found on sequenceByKindRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };
  const unexpectedError = () => {
    logger.logError({
      message: `Unexpected Error on sequencebyKindRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  const questionResponse = await QuestionService.getQuestion(
    questionSlug,
    country,
    language,
    notFound,
    unexpectedError
  );

  if (!questionResponse) {
    return reactRender(req, res.status(404), initialState);
  }

  if (!isInProgress(questionResponse) && !questionResponse.displayResults) {
    return res.redirect(questionResponse.aboutUrl);
  }

  const { sequenceConfig } = questionResponse;
  const questionModified = {
    ...questionResponse,
    sequenceConfig: transformExtraSlidesConfigFromQuery(
      sequenceConfig,
      !withIntroCardParam,
      !withPushProposalParam
    ),
  };

  const sequenceResponse = await QuestionService.startSequenceByKind(
    questionResponse.questionId,
    country,
    language,
    SEQUENCE.KIND_STANDARD,
    undefined,
    sessionIdFromCookie
  );

  if (!sequenceResponse) {
    return reactRender(req, res.status(404), initialState);
  }

  const extraSlidesConfig = addDemographicsToSequenceConfig(
    questionModified.sequenceConfig,
    !demographicsCookie && questionModified.hasDemographics,
    sequenceResponse.sequence.demographics
  );

  const cards = buildCards(
    sequenceResponse.sequence.proposals,
    extraSlidesConfig,
    questionModified.canPropose,
    true,
    withIntroCardParam,
    withPushProposalParam
  );

  initialState.currentQuestion = questionSlug;
  initialState.questions = {
    [questionSlug]: {
      question: questionModified,
    },
  };
  initialState.sequence = {
    ...sequence_state,
    isLoading: false,
    questionSlug,
    proposals: sequenceResponse.sequence.proposals,
    cards,
    sequenceSize: cards.length,
  };
  initialState.session = {
    sessionId: sessionIdFromCookie || sequenceResponse.sessionId,
  };
  initialState.notifications.tip = {
    contentId: NOTIF.FIRST_VOTE_TIP_MESSAGE,
    level: NOTIF.NOTIFICATION_LEVEL_INFORMATION,
    toDismiss: true,
  };
  updateTrackingQuestionParam(questionModified);

  return reactRender(req, res, initialState);
};
