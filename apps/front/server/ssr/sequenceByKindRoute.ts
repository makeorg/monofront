import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { isInProgress } from '@make.org/utils/helpers/date';
import { getLoggerInstance } from '@make.org/logger';
import { buildCards } from '@make.org/utils/helpers/sequence';
import { COOKIE, NOTIF, SEQUENCE } from '@make.org/types/enums';
import { Cookie } from 'universal-cookie';
import { sequence_state } from '@make.org/store/reducers/sequence';
import {
  ApiServiceHeadersType,
  DemographicDataType,
  ProposalCardType,
  QuestionExtraSlidesConfigType,
  SequenceCardType,
} from '@make.org/types';
import {
  getSequenceControversialLink,
  getSequencePopularLink,
} from '@make.org/utils/helpers/url';
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

  const toBoolean = (paramValue: string | null) => {
    if (paramValue?.toLowerCase() === 'true') {
      return true;
    }
    if (paramValue?.toLowerCase() === 'false') {
      return false;
    }

    return null;
  };

  const introCardParam = toBoolean(introCard);
  const pushProposalParam = toBoolean(pushProposal);

  const initialState = createInitialState();
  const logger = getLoggerInstance();

  // get cookies for session and demographics
  const sessionIdFromCookie = req.universalCookies.get(COOKIE.SESSION_ID);
  const demographicsCookie = req.universalCookies.get(COOKIE.DEMOGRAPHICS);

  const notFound = () => {
    logger.logError({
      message: `Question not found on sequenceByKindRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      app_detected_country: country,
      app_language: language,
      app_url: req.url,
      app_query: req.query,
    });
  };
  const unexpectedError = () => {
    logger.logError({
      message: `Unexpected Error on sequencebyKindRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      app_detected_country: country,
      app_language: language,
      app_url: req.url,
      app_query: req.query,
    });
  };

  const votedIds = firstProposal ? [firstProposal] : [];

  const question = await QuestionService.getQuestion(
    questionSlug,
    country,
    notFound,
    unexpectedError,
    language
  );

  if (!question) {
    return reactRender(req, res.status(404), initialState);
  }

  if (!isInProgress(question) && !question.displayResults) {
    return res.redirect(question.aboutUrl);
  }

  const sequenceMandatoryRequestHeaders: ApiServiceHeadersType = {
    'x-make-question-id': question.questionId,
    'x-make-question-slug': questionSlug,
    'x-make-question-language': question.returnedLanguage,
    'x-make-country': country,
    'x-make-client-language': language,
    'x-session-id': sessionIdFromCookie || '',
    'x-make-location': sequenceLocation,
  };

  const sequenceResult = await QuestionService.startSequenceByKind(
    question.questionId,
    votedIds,
    sequenceKind,
    language,
    sequenceMandatoryRequestHeaders
  );

  if (!sequenceResult) {
    return reactRender(req, res.status(404), initialState);
  }

  const { demographics: demographicsResult, sessionBindingMode } =
    sequenceResult.sequence;

  const displayDemographics = sessionBindingMode || !demographicsCookie;
  const sequenceDemographics: DemographicDataType[] = displayDemographics
    ? demographicsResult ?? []
    : [];

  const extraSlidesConfig: QuestionExtraSlidesConfigType = {
    ...question.sequenceConfig,
    demographics: sequenceDemographics,
    isDemographicsSessionBindingMode: !!sessionBindingMode,
  };

  if (extraSlidesConfig.introCard) {
    extraSlidesConfig.introCard.enabled =
      introCardParam ?? extraSlidesConfig.introCard.enabled;
  }

  if (extraSlidesConfig.pushProposalCard) {
    extraSlidesConfig.pushProposalCard.enabled =
      question.canPropose &&
      (pushProposalParam ?? extraSlidesConfig.pushProposalCard.enabled);
  }

  // Define Sequence cards, array must stay empty if there is no proposals
  let cards: SequenceCardType[] | ProposalCardType[] = [];
  if (sequenceResult.sequence.proposals.length > 0) {
    cards = buildCards(
      sequenceResult.sequence.proposals,
      extraSlidesConfig,
      true // is standard sequence
    );
  }

  updateTrackingQuestionParam(question);

  initialState.currentQuestion = questionSlug;
  initialState.questions = {
    [questionSlug]: {
      question,
    },
  };
  initialState.sequence = {
    ...sequence_state,
    isLoading: false,
    questionSlug,
    proposals: sequenceResult.sequence.proposals,
    cards,
    sequenceSize: cards.length,
    sequenceKind,
    sessionBindingMode,
  };
  initialState.session = {
    sessionId: sessionIdFromCookie || sequenceResult.sessionId,
  };
  initialState.notifications.tip = {
    contentId: NOTIF.FIRST_VOTE_TIP_MESSAGE,
    level: NOTIF.NOTIFICATION_LEVEL_INFORMATION,
    toDismiss: true,
  };

  return reactRender(req, res, initialState);
};
