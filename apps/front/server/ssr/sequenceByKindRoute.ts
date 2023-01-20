import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { isInProgress } from '@make.org/utils/helpers/date';
import { getLoggerInstance } from '@make.org/logger';
import {
  addDemographicsToSequenceConfig,
  buildCards,
} from '@make.org/utils/helpers/sequence';
import { COOKIE, NOTIF, SEQUENCE } from '@make.org/types/enums';
import { Cookie } from 'universal-cookie';
import { sequence_state } from '@make.org/store/reducers/sequence';
import {
  ApiServiceHeadersType,
  ProposalCardType,
  SequenceCardType,
} from '@make.org/types';
import {
  getSequenceControversialLink,
  getSequencePopularLink,
} from '@make.org/utils/helpers/url';
import { transformExtraSlidesConfigFromQuery } from './helpers/query.helper';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';

export const sequenceByKindRoute = async (
  req: Request & Cookie,
  res: Response
): Promise<void> => {
  const { questionSlug, country, language } = req.params;
  const { firstProposal, introCard, pushProposal } = req.query;
  const popularPath = getSequencePopularLink(country, questionSlug);
  const controversyPath = getSequenceControversialLink(country, questionSlug);
  let sequenceKind = SEQUENCE.KIND_STANDARD;
  let sequenceLocation = 'sequence';

  if (req.path === popularPath) {
    sequenceKind = SEQUENCE.KIND_CONSENSUS;
    sequenceLocation = 'sequence-popular';
  }
  if (req.path === controversyPath) {
    sequenceKind = SEQUENCE.KIND_CONTROVERSY;
    sequenceLocation = 'sequence-controversial';
  }

  const withIntroCardParam = introCard?.toLowerCase() !== 'false';
  const withPushProposalCardParam = pushProposal?.toLowerCase() !== 'false';

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

  const votedIds = firstProposal ? [firstProposal] : [];

  const questionResponse = await QuestionService.getQuestion(
    questionSlug,
    country,
    notFound,
    unexpectedError,
    language
  );

  if (!questionResponse) {
    return reactRender(req, res.status(404), initialState);
  }

  if (!isInProgress(questionResponse) && !questionResponse.displayResults) {
    return res.redirect(questionResponse.aboutUrl);
  }

  const { sequenceConfig } = questionResponse;
  // Handle query parameters for extra slides config (introCard, pushProposalCard, finalCard)
  const questionModified = {
    ...questionResponse,
    sequenceConfig: transformExtraSlidesConfigFromQuery(
      sequenceConfig,
      !withIntroCardParam,
      !withPushProposalCardParam
    ),
  };
  sequenceLocation = `${sequenceLocation} ${questionModified.questionId}`;
  const sequenceMandatoryRequestHeaders: ApiServiceHeadersType = {
    'x-make-question-id': questionModified.questionId,
    'x-make-country': country,
    'x-make-language': language,
    'x-session-id': sessionIdFromCookie || '',
    'x-make-location': sequenceLocation,
  };

  const sequenceResponse = await QuestionService.startSequenceByKind(
    questionResponse.questionId,
    votedIds,
    sequenceKind,
    sequenceMandatoryRequestHeaders
  );

  if (!sequenceResponse) {
    return reactRender(req, res.status(404), initialState);
  }

  // Handle demographics Card
  const extraSlidesConfig = addDemographicsToSequenceConfig(
    questionModified.sequenceConfig,
    !demographicsCookie && questionModified.hasDemographics,
    sequenceResponse.sequence.demographics
  );

  // Define Sequence cards, array must stay empty if there is no proposals
  let cards: SequenceCardType[] | ProposalCardType[] = [];
  if (sequenceResponse.sequence.proposals.length > 0) {
    cards = buildCards(
      sequenceResponse.sequence.proposals,
      extraSlidesConfig,
      questionModified.canPropose,
      true,
      withIntroCardParam,
      withPushProposalCardParam
    );
  }

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
    sequenceKind,
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
