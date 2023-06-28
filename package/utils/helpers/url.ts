import 'url-search-params-polyfill';
import { generatePath } from 'react-router';
import queryString from 'query-string';
import { LocaleType, URL } from '@make.org/types/enums';
import { env } from '@make.org/assets/env';
import { UnknownObjectType } from '@make.org/types';
import {
  ROUTE_PARTICIPATE,
  ROUTE_SEQUENCE,
  ROUTE_SEQUENCE_POPULAR,
  ROUTE_SEQUENCE_CONTROVERSIAL,
  ROUTE_SEQUENCE_KEYWORD,
  ROUTE_PROPOSAL,
  ROUTE_ORGANISATION_PROFILE,
  ROUTE_PERSONALITY_PROFILE,
  ROUTE_STATIC_DATA_FR,
  ROUTE_STATIC_GTU_FR,
  ROUTE_STATIC_LEGAL_FR,
  ROUTE_RESULTS,
  ROUTE_TOP_IDEAS,
  ROUTE_TOP_IDEA_DETAILS,
  ROUTE_STATIC_NOTFOUND,
  ROUTE_STATIC_A11Y_FR,
  ROUTE_BROWSE_CONSULTATIONS,
  ROUTE_BROWSE_RESULTS,
  ROUTE_CONSULTATION_STEP,
  ROUTE_COUNTRY,
  ROUTE_PASSWORD_RECOVERY,
  ROUTE_EXPLORE,
  ROUTE_STATIC_COOKIES,
  ROUTE_STATIC_DATA_DE,
  ROUTE_STATIC_GTU_DE,
  ROUTE_STATIC_LEGAL_DE,
  ROUTE_STATIC_CONTACT_DE,
  ROUTE_STATIC_A11Y_DE,
  ROUTE_STATIC_CONTACT,
  ROUTE_STATIC_DATA,
  ROUTE_STATIC_GTU,
  ROUTE_STATIC_LEGAL,
  ROUTE_STATIC_A11Y,
  ROUTE_STATIC_MODERATION,
  ROUTE_STATIC_MODERATION_DE,
} from '../routes';
import { DEFAULT_COUNTRY, DEFAULT_LANGUAGE } from '../constants/config';

declare global {
  interface Window {
    FRONT_URL?: string;
  }
}

export const getRelativeCurrentUrl = (pathName: string): string =>
  `${env.frontUrl() || window.FRONT_URL}${pathName}`;

export const getPartnerAnchor = (aboutUrl: string): string =>
  `${aboutUrl}#partenaires`;

export const getMultiLangStaticLink = (
  country: string,
  language: string,
  DefaultLink: string,
  FRLink: string,
  DELink: string
): string => {
  switch (language) {
    case [LocaleType.fr].toString():
      return generatePath(FRLink, { country });
    case [LocaleType.de].toString():
      return generatePath(DELink, { country });
    default:
      return generatePath(DefaultLink, { country });
  }
};

/** @todo move all this stuff to Shared/routes file or create a route helper */
/**
 * Get the sequence link
 * @param  {string} country
 * @param  {string} questionSlug
 *
 * @return {string}
 */
export const getSequenceLink = (
  country: string,
  questionSlug: string,
  params?: UnknownObjectType
): string =>
  generatePath(ROUTE_SEQUENCE, {
    country,
    questionSlug,
  }).concat(
    params && Object.keys(params).length > 0
      ? `?${queryString.stringify(params)}`
      : ''
  );

/**
 * Get the sequence Popular link
 * @param  {string} country
 * @param  {string} questionSlug
 *
 * @return {string}
 */
export const getSequencePopularLink = (
  country: string,
  questionSlug: string,
  params?: UnknownObjectType
): string =>
  generatePath(ROUTE_SEQUENCE_POPULAR, {
    country,
    questionSlug,
  }).concat(
    params && Object.keys(params).length > 0
      ? `?${queryString.stringify(params)}`
      : ''
  );

/**
 * Get the sequence Controversial link
 * @param  {string} country
 * @param  {string} questionSlug
 * @return {string}
 */
export const getSequenceControversialLink = (
  country: string,
  questionSlug: string,
  params?: UnknownObjectType
): string =>
  generatePath(ROUTE_SEQUENCE_CONTROVERSIAL, {
    country,
    questionSlug,
  }).concat(
    params && Object.keys(params).length > 0
      ? `?${queryString.stringify(params)}`
      : ''
  );

/**
 * Get the sequence keyword link
 * @param  {string} country
 * @param  {string} questionSlug
 * @param  {string} encodedKeyword
 *
 * @return {string}
 */
export const getSequenceKeywordLink = (
  country: string,
  questionSlug: string,
  encodedKeyword: string,
  params?: UnknownObjectType
): string =>
  generatePath(ROUTE_SEQUENCE_KEYWORD, {
    country,
    questionSlug,
    encodedKeyword,
  }).concat(
    params && Object.keys(params).length > 0
      ? `?${queryString.stringify(params)}`
      : ''
  );

/**
 * Get the browse consultations link
 *
 * @param  {string} country
 * @param  {number} pageId
 *
 * @return {string}
 */
export const getBrowseConsultationsLink = (
  country: string,
  pageId = 1
): string =>
  generatePath(ROUTE_BROWSE_CONSULTATIONS, {
    country,
    pageId,
  });

/**
 * Get the browse results link
 *
 * @param  {string} country
 * @param  {number} pageId
 *
 * @return {string}
 */
export const getBrowseResultsLink = (country: string, pageId = 1): string =>
  generatePath(ROUTE_BROWSE_RESULTS, {
    country,
    pageId,
  });

/**
 * Get the participate link
 *
 * @param  {string} country
 * @param  {string} questionSlug
 *
 * @return {string}
 */
export const getParticipateLink = (
  country: string,
  questionSlug: string
): string =>
  generatePath(ROUTE_PARTICIPATE, {
    country,
    questionSlug,
  });

/**
 * Get the explore link
 *
 * @param  {string} country
 * @param  {string} questionSlug
 * @param  {number} pageId
 *
 * @return {string}
 */
export const getExploreLink = (
  country: string,
  questionSlug: string,
  // eslint-disable-next-line default-param-last
  pageId = 1,
  params?: Record<string, string | boolean | undefined>
): string =>
  generatePath(ROUTE_EXPLORE, {
    country,
    questionSlug,
    pageId,
  }).concat(
    params && Object.keys(params).length > 0
      ? `?${queryString.stringify(params)}`
      : ''
  );

/**
 * Get the results link
 *
 * @param  {string} country
 * @param  {string} questionSlug
 *
 * @return {string}
 */
export const getResultsLink = (country: string, questionSlug: string): string =>
  generatePath(ROUTE_RESULTS, {
    country,
    questionSlug,
  });

/**
 * Get the top ideas by questions link
 *
 * @param  {string} country
 * @param  {string} questionSlug
 *
 * @return {string}
 */
export const getTopIdeasLink = (
  country: string,
  questionSlug: string
): string =>
  generatePath(ROUTE_TOP_IDEAS, {
    country,
    questionSlug,
  });

/**
 * Get the top idea details link
 *
 * @param  {string} country
 * @param  {string} questionSlug
 * @param  {number} pageId

 * @return {string}
 */
export const getTopIdeaDetailsLink = (
  country: string,
  questionSlug: string,
  topIdeaId: string,
  pageId = 1
): string =>
  generatePath(ROUTE_TOP_IDEA_DETAILS, {
    country,
    questionSlug,
    topIdeaId,
    pageId,
  });

/**
 * Get the consultation link
 *
 * @param  {string} country
 * @param  {string} questionSlug
 * @param  {string} consultationStep
 *
 * @return {string}
 */
export const getDynamicConsultationLink = (
  country: string,
  questionSlug: string,
  consultationStep: string
): string =>
  generatePath(ROUTE_CONSULTATION_STEP, {
    country,
    questionSlug,
    consultationStep,
  });

/**
 * Get the proposal link
 *
 * @param  {string} country
 * @param  {string} questionSlug
 * @param  {string} proposalId
 * @param  {string} proposalSlug
 *
 * @return {string}
 */
export const getProposalLink = (
  country: string,
  questionSlug: string,
  proposalId: string,
  proposalSlug: string
): string =>
  generatePath(ROUTE_PROPOSAL, {
    country,
    questionSlug,
    proposalId,
    proposalSlug,
  });

/**
 * Get the organisation profile link
 *
 * @param  {string} country
 * @param  {string} organisationSlug
 * @return {string}
 */
export const getOrganisationProfileLink = (
  country: string,
  organisationSlug: string
): string =>
  generatePath(ROUTE_ORGANISATION_PROFILE, {
    country,
    organisationSlug,
  });

/**
 * Get the personality profile link
 *
 * @param  {string} country
 * @param  {string} userId
 * @return {string}
 */
export const getPersonalityProfileLink = (
  country: string,
  userId: string
): string =>
  generatePath(ROUTE_PERSONALITY_PROFILE, {
    country,
    userId,
  });

/**
 * Get the contact page link
 *
 * @param  {string} country
 * @param  {string} language
 * @return {string}
 */
export const getContactPageLink = (country: string, language: string): string =>
  getMultiLangStaticLink(
    country,
    language,
    ROUTE_STATIC_CONTACT,
    // same uri for french version
    ROUTE_STATIC_CONTACT,
    ROUTE_STATIC_CONTACT_DE
  );

/**
 * Get the data page link
 *
 * @param  {string} country
 * @param  {string} language
 * @return {string}
 */
export const getDataPageLink = (country: string, language: string): string =>
  getMultiLangStaticLink(
    country,
    language,
    ROUTE_STATIC_DATA,
    ROUTE_STATIC_DATA_FR,
    ROUTE_STATIC_DATA_DE
  );

/**
 * Get the GTU page link
 *
 * @param  {string} country
 * @param  {string} language
 * @return {string}
 */
export const getGTUPageLink = (country: string, language: string): string =>
  getMultiLangStaticLink(
    country,
    language,
    ROUTE_STATIC_GTU,
    ROUTE_STATIC_GTU_FR,
    ROUTE_STATIC_GTU_DE
  );

/**
 * Get the Legal page link
 *
 * @param  {string} country
 * @param  {string} language
 * @return {string}
 */
export const getLegalPageLink = (country: string, language: string): string =>
  getMultiLangStaticLink(
    country,
    language,
    ROUTE_STATIC_LEGAL,
    ROUTE_STATIC_LEGAL_FR,
    ROUTE_STATIC_LEGAL_DE
  );

/**
 * Get the A11y page link
 *
 * @param  {string} country
 * @param  {string} language
 * @return {string}
 */
export const getA11YPageLink = (country: string, language: string): string =>
  getMultiLangStaticLink(
    country,
    language,
    ROUTE_STATIC_A11Y,
    ROUTE_STATIC_A11Y_FR,
    ROUTE_STATIC_A11Y_DE
  );

/**
 * Get the Cookies page link
 *
 * @param  {string} country
 * @return {string}
 */
export const getCookiesPageLink = (country: string): string =>
  generatePath(ROUTE_STATIC_COOKIES, {
    country,
  });

/**
 * Get the Moderation page link
 *
 * @param  {string} country
 * @param  {string} language
 * @return {string}
 */
export const getModerationPageLink = (
  country: string,
  language: string
): string =>
  getMultiLangStaticLink(
    country,
    language,
    ROUTE_STATIC_MODERATION,
    ROUTE_STATIC_MODERATION,
    ROUTE_STATIC_MODERATION_DE
  );

/**
 * Get the home page link
 *
 * @param  {string} country
 * @return {string}
 */
export const getHomeLink = (country: string): string =>
  country
    ? generatePath(ROUTE_COUNTRY, {
        country,
      })
    : '/';

/**
 * Get the Not found page link
 *
 * @param  {string} country
 * @return {string}
 */
export const getNotFoundPath = (country?: string): string =>
  generatePath(ROUTE_STATIC_NOTFOUND, {
    country: country || DEFAULT_COUNTRY,
  });

export const redirectToNotFoundPage = (country: string): void => {
  window.location.pathname = generatePath(ROUTE_STATIC_NOTFOUND, {
    country,
  });
};

/**
 * Get webflow dynamic page link
 *
 * @param  {string} language
 * @param  {string} route
 * @return {string}
 */
export const getWhoAreWeDynamicLink = (
  language: string,
  route: string
): string => {
  let link;

  switch (language) {
    case 'cs':
    case 'uk':
    case 'fr':
    case 'de':
    case 'en':
      link = `${URL.ABOUT_MAKE_LINK}${language}${route}`;
      break;

    // @todo temporary links for weglot, will be normalised later

    case 'bg':
    case 'es':
    case 'fi':
    case 'it':
    case 'nl':
    case 'pl':
    case 'ro':
    case 'da':
    case 'hu':
      link = `https://${language}.about.make.org/de/about-us`;
      break;
    default:
      link = `${URL.ABOUT_MAKE_LINK}${DEFAULT_LANGUAGE}${route}`;
      break;
  }

  return link;
};

export const getWebflowDynamicLink = (
  language: string,
  route: string
): string => {
  let link;

  switch (language) {
    case 'fr':
    case 'de':
    case 'en':
      link = `${URL.ABOUT_MAKE_LINK}${language}${route}`;
      break;
    default:
      link = `${URL.ABOUT_MAKE_LINK}${DEFAULT_LANGUAGE}${route}`;
      break;
  }

  return link;
};

/**
 * Get the password recovery link
 *
 * @param  {string} country
 * @param  {number} userId
 * @param  {number} resetToken
 *
 * @return {string}
 */
export const getPasswordRecoveryLink = (
  country: string,
  userId: string,
  resetToken: string
): string =>
  generatePath(ROUTE_PASSWORD_RECOVERY, {
    country,
    userId,
    resetToken,
  });

/**
 * Get the News link depending from country
 *
 * @param  {string} country
 *
 * @return {string}
 */
export const getNewsLinkByCountry = (country: string): string => {
  switch (country) {
    case 'FR':
      return URL.NEWS_LINK_FR;
    case 'DE':
      return URL.NEWS_LINK_DE;
    default:
      return URL.NEWS_LINK_EN;
  }
};
