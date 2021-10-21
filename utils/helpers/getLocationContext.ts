import {
  ROUTE_SEQUENCE,
  ROUTE_SEQUENCE_POPULAR,
  ROUTE_SEQUENCE_CONTROVERSIAL,
  ROUTE_SEQUENCE_KEYWORD,
  ROUTE_PROPOSAL,
  matchRoute,
  ROUTE_SEARCH,
  ROUTE_SEARCH_PROPOSALS,
  ROUTE_SEARCH_ORGANISATIONS,
  ROUTE_SEARCH_CONSULTATIONS,
  ROUTE_PERSONALITY_PROFILE,
  ROUTE_ORGANISATION_PROFILE,
  ROUTE_PROFILE_EDIT,
  ROUTE_PROFILE_FAVOURITES,
  ROUTE_PROFILE_PROPOSALS,
  ROUTE_PROFILE_FOLLOWING,
  ROUTE_RESULTS,
  ROUTE_TOP_IDEAS,
  ROUTE_TOP_IDEA_DETAILS,
  ROUTE_PROFILE_OPINIONS,
  ROUTE_STATIC_NOCOOKIES,
  ROUTE_STATIC_NOTFOUND,
  ROUTE_BROWSE_CONSULTATIONS,
  ROUTE_BROWSE_RESULTS,
  ROUTE_PARTICIPATE,
  ROUTE_EXPLORE,
  ROUTE_STATIC_COOKIES,
} from '../routes';

export const getAppLocationContext = (
  pathname: string,
  questionId = '',
  proposalId = ''
): string => {
  const path = pathname.toLowerCase();

  const locations = [
    { route: ROUTE_PARTICIPATE, name: `page-participate ${questionId}` },
    { route: ROUTE_EXPLORE, name: `page-explore ${questionId}` },
    { route: ROUTE_RESULTS, name: `page-results ${questionId}` },
    {
      route: ROUTE_TOP_IDEA_DETAILS,
      name: `page-top-idea-details ${questionId}`,
    },
    { route: ROUTE_TOP_IDEAS, name: `page-top-ideas ${questionId}` },
    {
      route: ROUTE_SEQUENCE,
      name: `sequence ${questionId}`,
      exact: true,
      strict: true,
    },
    { route: ROUTE_SEQUENCE_POPULAR, name: `sequence-popular ${questionId}` },
    {
      route: ROUTE_SEQUENCE_CONTROVERSIAL,
      name: `sequence-controversial ${questionId}`,
    },
    {
      route: ROUTE_SEQUENCE_KEYWORD,
      name: `sequence-keyword ${questionId}`,
    },
    { route: ROUTE_PROPOSAL, name: `proposal-page ${proposalId}` },
    { route: ROUTE_SEARCH_PROPOSALS, name: `search-proposals-page` },
    { route: ROUTE_SEARCH_ORGANISATIONS, name: `search-organisations-page` },
    { route: ROUTE_SEARCH_CONSULTATIONS, name: `search-consultations-page` },
    { route: ROUTE_SEARCH, name: `search-page` },
    { route: ROUTE_PROFILE_EDIT, name: `private-profile-page` },
    {
      route: ROUTE_PROFILE_FAVOURITES,
      name: `private-profile-page`,
      exact: true,
      strict: true,
    },
    {
      route: ROUTE_PROFILE_PROPOSALS,
      name: `private-profile-page`,
      exact: true,
      strict: true,
    },
    {
      route: ROUTE_PROFILE_FOLLOWING,
      name: `private-profile-page`,
      exact: true,
      strict: true,
    },
    {
      route: ROUTE_PROFILE_OPINIONS,
      name: `private-profile-page`,
      exact: true,
      strict: true,
    },
    {
      route: ROUTE_ORGANISATION_PROFILE,
      name: `public-profile-page`,
    },
    {
      route: ROUTE_PERSONALITY_PROFILE,
      name: `public-profile-page`,
    },
    {
      route: ROUTE_STATIC_NOCOOKIES,
      name: `nocookies-page`,
    },
    {
      route: ROUTE_STATIC_COOKIES,
      name: `cookies-page`,
    },
    {
      route: ROUTE_STATIC_NOTFOUND,
      name: `not-found-page`,
    },
    {
      route: ROUTE_BROWSE_CONSULTATIONS,
      name: `browse-consultations-page`,
    },
    {
      route: ROUTE_BROWSE_RESULTS,
      name: `browse-results-page`,
    },
    { route: '/', name: `homepage`, exact: true, strict: true },
    { route: '/:country', name: `homepage`, exact: true, strict: false },
  ];

  const location = locations.find(item =>
    matchRoute(
      path,
      item.route,
      item.exact ? item.exact : false,
      item.strict ? item.strict : false
    )
  );

  return location === undefined
    ? `unknown-location ${pathname}`
    : location.name;
};

export const getAppTrackingLocation = (
  pathname: string,
  questionId?: string,
  proposalId?: string
): string => {
  const location = getAppLocationContext(pathname, questionId, proposalId);

  return location.split(' ').shift() || '';
};
