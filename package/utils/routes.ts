import { ParsedQuery, stringify } from 'query-string';
import { matchPath, generatePath } from 'react-router';

export const ROUTE_COUNTRY = '/:country(\\w{2})';
export const ROUTE_COUNTRY_LANG = '/:country(\\w{2})-:language(\\w{2})';
export const ROUTE_COUNTRY_FR = '/FR';
export const ROUTE_BASE_CONSULTATION = `/consultation/:questionSlug`;

export const ROUTE_REDIRECT_CONSULTATIONS = `${ROUTE_BASE_CONSULTATION}/consultation`;
export const ROUTE_REDIRECT_PARTICIPATE = `${ROUTE_BASE_CONSULTATION}/participate`;
export const ROUTE_REDIRECT_EXPLORE = `${ROUTE_BASE_CONSULTATION}/explore/page/:pageId`;
export const ROUTE_REDIRECT_SEQUENCE = `${ROUTE_BASE_CONSULTATION}/selection`;
export const ROUTE_REDIRECT_SEQUENCE_POPULAR = `${ROUTE_BASE_CONSULTATION}/selection-popular`;
export const ROUTE_REDIRECT_SEQUENCE_CONTROVERSY = `${ROUTE_BASE_CONSULTATION}/selection-controversial`;
export const ROUTE_REDIRECT_RESULTS = `${ROUTE_BASE_CONSULTATION}/results`;

export const ROUTE_BROWSE_CONSULTATIONS = `${ROUTE_COUNTRY}/browse/consultations/page/:pageId`;
export const ROUTE_BROWSE_RESULTS = `${ROUTE_COUNTRY}/browse/results/page/:pageId`;

export const ROUTE_CONSULTATION_STEP = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/:consultationStep`;
export const ROUTE_CONSULTATION = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/consultation`;
export const ROUTE_PARTICIPATE = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/participate`;
export const ROUTE_EXPLORE = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/explore/page/:pageId`;
export const ROUTE_EXPLORE_ROOT = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/explore`;
export const ROUTE_EXPLORE_FIRST_PAGE = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/explore/page/1`;
export const ROUTE_RESULTS = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/results`;
export const ROUTE_TOP_IDEAS = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/top-ideas`;
export const ROUTE_TOP_IDEA_DETAILS = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/top-ideas/:topIdeaId/page/:pageId`;
export const ROUTE_SEQUENCE = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/selection`;
export const ROUTE_SEQUENCE_POPULAR = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/selection-popular`;
export const ROUTE_SEQUENCE_CONTROVERSIAL = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/selection-controversial`;
export const ROUTE_SEQUENCE_KEYWORD = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/selection/keyword/:encodedKeyword`;
export const ROUTE_PROPOSAL = `${ROUTE_COUNTRY}${ROUTE_BASE_CONSULTATION}/proposal/:proposalId/:proposalSlug`;

export const ROUTE_SEARCH = `${ROUTE_COUNTRY}/search`;
export const ROUTE_SEARCH_PROPOSALS = `${ROUTE_COUNTRY}/search/proposals/page/:pageId`;
export const ROUTE_SEARCH_ORGANISATIONS = `${ROUTE_COUNTRY}/search/organisations`;
export const ROUTE_SEARCH_CONSULTATIONS = `${ROUTE_COUNTRY}/search/consultations`;

export const ROUTE_ACCOUNT_ACTIVATION = `${ROUTE_COUNTRY}/account-activation/:userId/:verificationToken`;
export const ROUTE_PASSWORD_RECOVERY = `${ROUTE_COUNTRY}/password-recovery/:userId/:resetToken`;
export const ROUTE_PROFILE = `${ROUTE_COUNTRY}/profile`;
export const ROUTE_PROFILE_EDIT = `${ROUTE_PROFILE}/edit`;
export const ROUTE_PROFILE_PROPOSALS = `${ROUTE_PROFILE}/proposals/page/:pageId`;
export const ROUTE_PROFILE_PROPOSALS_FIRST_PAGE = `${ROUTE_PROFILE}/proposals/page/1`;

export const ROUTE_PROFILE_FAVOURITES = `${ROUTE_PROFILE}/favourites/page/:pageId`;
export const ROUTE_PROFILE_OPINIONS = `${ROUTE_PROFILE}/opinions`;
export const ROUTE_PERSONALITY_PROFILE = `${ROUTE_PROFILE}/personality/:userId`;
export const ROUTE_ORGANISATION_PROFILE = `${ROUTE_PROFILE}/organisation/:organisationSlug`;
export const DEPRECATED_ROUTE_ORGANISATION_PROPOSALS = `${ROUTE_ORGANISATION_PROFILE}/proposals`;
export const ROUTE_ORGANISATION_PROPOSALS = `${ROUTE_ORGANISATION_PROFILE}/proposals/page/:pageId`;
export const ROUTE_ORGANISATION_PROPOSALS_FIRST_PAGE = `${ROUTE_ORGANISATION_PROFILE}/proposals/page/1`;
export const ROUTE_ORGANISATION_VOTES = `${ROUTE_ORGANISATION_PROFILE}/votes/page/:pageId`;
export const ROUTE_STATIC_NOTFOUND = `${ROUTE_COUNTRY}/not-found`;
export const ROUTE_STATIC_NOCOOKIES = `${ROUTE_COUNTRY_FR}/no-cookies`;
export const ROUTE_STATIC_COOKIES = `${ROUTE_COUNTRY}/cookies`;
export const ROUTE_STATIC_CONTACT = `${ROUTE_COUNTRY}/contact`;
export const ROUTE_STATIC_LEGAL = `${ROUTE_COUNTRY}/legal-mentions`;
export const ROUTE_STATIC_GTU = `${ROUTE_COUNTRY}/terms-of-use`;
export const ROUTE_STATIC_DATA = `${ROUTE_COUNTRY}/data-terms`;
export const ROUTE_STATIC_A11Y = `${ROUTE_COUNTRY}/accessibility`;
export const ROUTE_STATIC_MODERATION = `${ROUTE_COUNTRY}/moderation`;

// Translated routes for fr language
export const ROUTE_STATIC_LEGAL_FR = `${ROUTE_COUNTRY}/mentions-legales`;
export const ROUTE_STATIC_GTU_FR = `${ROUTE_COUNTRY}/conditions-dutilisation`;
export const ROUTE_STATIC_DATA_FR = `${ROUTE_COUNTRY}/politique-donnees`;
export const ROUTE_STATIC_A11Y_FR = `${ROUTE_COUNTRY}/declaration-accessibilite`;

// Translated routes for de language
export const ROUTE_STATIC_LEGAL_DE = `${ROUTE_COUNTRY}/impressum`;
export const ROUTE_STATIC_GTU_DE = `${ROUTE_COUNTRY}/nutzungsbedingungen`;
export const ROUTE_STATIC_DATA_DE = `${ROUTE_COUNTRY}/datenschutzerklärung`;
export const ROUTE_STATIC_A11Y_DE = `${ROUTE_COUNTRY}/barrierefreiheit`;
export const ROUTE_STATIC_CONTACT_DE = `${ROUTE_COUNTRY}/kontakt`;
export const ROUTE_STATIC_MODERATION_DE = `${ROUTE_COUNTRY}/moderationscharta`;

// webflow routes
export const ROUTE_WHOAREWE = '/about-us';
export const ROUTE_PARTNERSHIP = '/collaborate';
export const ROUTE_JOIN_GREAT_CAUSE = '/rejoindre-une-grande-cause';

// preview
export const BASE_PREVIEW_PATH = '/preview';
const BASE_PREVIEW_PATH_REG = /^\/preview/;

export const matchRoute = (
  pathname: string,
  routePath: string,
  exact = false,
  strict = false,
  sensitive = false,
  matchPreview = false
): boolean => {
  const pathToCheck: string = matchPreview
    ? pathname.replace(BASE_PREVIEW_PATH_REG, '')
    : pathname;

  return !!matchPath(pathToCheck, {
    path: routePath,
    exact,
    strict,
    sensitive,
  });
};

export const getRouteOrganisationProposals = (
  country: string,
  organisationSlug: string,
  pageId = 1
): string =>
  generatePath(ROUTE_ORGANISATION_PROPOSALS, {
    country,
    organisationSlug,
    pageId,
  });

export const getRouteOrganisationVotes = (
  country: string,
  organisationSlug: string,
  pageId = 1
): string =>
  generatePath(ROUTE_ORGANISATION_VOTES, {
    country,
    organisationSlug,
    pageId,
  });

export const getRouteProfile = (country: string): string =>
  generatePath(ROUTE_PROFILE, { country });

export const getRouteProfileEdit = (country: string): string =>
  generatePath(ROUTE_PROFILE_EDIT, { country });

export const getRouteProfileProposals = (country: string, pageId = 1): string =>
  generatePath(ROUTE_PROFILE_PROPOSALS, { country, pageId });

export const getRouteProfileFavourites = (
  country: string,
  pageId = 1
): string => generatePath(ROUTE_PROFILE_FAVOURITES, { country, pageId });

export const getRouteProfileOpinions = (country: string): string =>
  generatePath(ROUTE_PROFILE_OPINIONS, { country });

export const getRouteNoCookies = (country: string): string =>
  generatePath(ROUTE_STATIC_NOCOOKIES, { country });

/**
 * Get the search main results route
 *
 * @param  {string} country
 * @param  {string} query
 * @return {string}
 */
export const getRouteSearch = (country: string, query: string): string =>
  `${generatePath(ROUTE_SEARCH, { country })}?query=${query}`;

/**
 * Get the search proposals results route
 *
 * @param  {string} country
 * @param  {string} query
 * @param  {string} page
 * @return {string}
 */
export const getRouteSearchProposals = (
  country: string,
  query: string,
  pageId = 1
): string =>
  `${generatePath(ROUTE_SEARCH_PROPOSALS, {
    country,
    pageId,
  })}?query=${query}`;

/**
 * Get the search proposals results route
 *
 * @param  {string} country
 * @param  {string} query
 * @return {string}
 */
export const getRouteSearchConsultations = (
  country: string,
  query: string
): string =>
  `${generatePath(ROUTE_SEARCH_CONSULTATIONS, {
    country,
  })}?query=${query}`;

/**
 * Get the search organisations results route
 *
 * @param  {string} country
 * @param  {string} query
 * @return {string}
 */

export const getRouteSearchOrganisations = (
  country: string,
  query: string
): string =>
  `${generatePath(ROUTE_SEARCH_ORGANISATIONS, {
    country,
  })}?query=${query}`;

/**
 * Get a path with pagination params
 *
 * @param  {string} path
 * @param  {string} country
 * @param  {string} page
 * @param  {string} questionSlug
 * @return {string}
 */
export const getPaginatedRoute = (
  path: string,
  country: string,
  pageId: number,
  questionSlug?: string,
  queryParams?: ParsedQuery<string>,
  organisationSlug?: string,
  topIdeaId?: string
): string =>
  generatePath(path, {
    country,
    pageId,
    questionSlug,
    organisationSlug,
    topIdeaId,
  }).concat(
    queryParams && Object.keys(queryParams).length > 0
      ? `?${stringify(queryParams)}`
      : ''
  );

export const isParticipatePage = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(
    pathname,
    ROUTE_PARTICIPATE,
    false,
    false,
    false,
    includingPreview
  );

export const isExplorePage = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(pathname, ROUTE_EXPLORE, false, false, false, includingPreview);

export const isResultsPage = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(pathname, ROUTE_RESULTS, false, false, false, includingPreview);

export const isTopIdeasPage = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(pathname, ROUTE_TOP_IDEAS, false, false, false, includingPreview);

export const isTopIdeaDetailsPage = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(
    pathname,
    ROUTE_TOP_IDEA_DETAILS,
    false,
    false,
    false,
    includingPreview
  );

export const isOrganisationProposals = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(
    pathname,
    ROUTE_ORGANISATION_PROPOSALS,
    false,
    false,
    false,
    includingPreview
  );

export const isOrganisationVotes = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(
    pathname,
    ROUTE_ORGANISATION_VOTES,
    false,
    false,
    false,
    includingPreview
  );
export const isProfileProposals = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(
    pathname,
    ROUTE_PROFILE_PROPOSALS,
    false,
    false,
    false,
    includingPreview
  );

export const isProfileFavourites = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(
    pathname,
    ROUTE_PROFILE_FAVOURITES,
    false,
    false,
    false,
    includingPreview
  );

export const isBrowseConsultationsPage = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(
    pathname,
    ROUTE_BROWSE_CONSULTATIONS,
    false,
    false,
    false,
    includingPreview
  );

export const isBrowseResultsPage = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(
    pathname,
    ROUTE_BROWSE_RESULTS,
    false,
    false,
    false,
    includingPreview
  );

export const isHomepage = (
  pathname: string,
  includingPreview = true
): boolean => matchRoute(pathname, '/', true, false, false, includingPreview);

export const isHomepageWithLocale = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(pathname, ROUTE_COUNTRY, true, false, false, includingPreview);

export const isSequencePage = (
  pathname: string,
  includingPreview = true
): boolean =>
  matchRoute(pathname, ROUTE_SEQUENCE, false, false, false, includingPreview);
