import * as routes from '@make.org/utils/routes';
import { getLocationContext, getTrackingLocation } from './getLocationContext';

describe('getLocationContext', () => {
  const fixtures = [
    {
      name: 'ROUTE_PARTICIPATE',
      path: '/FR/consultation/foo/participate',
      params: { questionId: 'question-id' },
      expected: 'page-participate question-id',
      expectedTracking: 'page-participate',
    },
    {
      name: 'ROUTE_EXPLORE',
      path: '/FR/consultation/foo/explore/page/1',
      params: { questionId: 'question-id' },
      expected: 'page-explore question-id',
      expectedTracking: 'page-explore',
    },
    {
      name: 'ROUTE_RESULTS',
      path: '/FR/consultation/foo/results',
      params: { questionId: 'question-id' },
      expected: 'page-results question-id',
      expectedTracking: 'page-results',
    },
    {
      name: 'ROUTE_TOP_IDEA_DETAILS',
      path: '/FR/consultation/foo/top-ideas/bar',
      params: { questionId: 'question-id' },
      expected: 'page-top-idea-details question-id',
      expectedTracking: 'page-top-idea-details',
    },
    {
      name: 'ROUTE_TOP_IDEAS',
      path: '/FR/consultation/foo/top-ideas',
      params: { questionId: 'question-id' },
      expected: 'page-top-ideas question-id',
      expectedTracking: 'page-top-ideas',
    },
    {
      name: 'ROUTE_SEQUENCE',
      path: '/FR/consultation/foo/selection',
      params: { questionId: 'question-id' },
      expected: 'sequence question-id',
      expectedTracking: 'sequence',
    },
    {
      name: 'ROUTE_SEQUENCE_POPULAR',
      path: '/FR/consultation/foo/selection-popular',
      params: { questionId: 'question-id' },
      expected: 'sequence-popular question-id',
      expectedTracking: 'sequence-popular',
    },
    {
      name: 'ROUTE_SEQUENCE_CONTROVERSIAL',
      path: '/FR/consultation/foo/selection-controversial',
      params: { questionId: 'question-id' },
      expected: 'sequence-controversial question-id',
      expectedTracking: 'sequence-controversial',
    },
    {
      name: 'ROUTE_SEQUENCE_KEYWORD',
      path: '/FR/consultation/foo/selection/keyword/bar',
      params: { questionId: 'question-id' },
      expected: 'sequence-keyword question-id',
      expectedTracking: 'sequence-keyword',
    },
    {
      name: 'ROUTE_PROPOSAL',
      path: '/FR/consultation/foo/proposal/bar/2',
      params: { proposalId: 'proposal-id' },
      expected: 'proposal-page proposal-id',
      expectedTracking: 'proposal-page',
    },
    {
      name: 'ROUTE_SEARCH_PROPOSALS',
      path: '/FR/search/proposals',
      expected: 'search-proposals-page',
      expectedTracking: 'search-proposals-page',
    },
    {
      name: 'ROUTE_SEARCH_ORGANISATIONS',
      path: '/FR/search/organisations',
      expected: 'search-organisations-page',
      expectedTracking: 'search-organisations-page',
    },
    {
      name: 'ROUTE_SEARCH_CONSULTATIONS',
      path: '/FR/search/consultations',
      expected: 'search-consultations-page',
      expectedTracking: 'search-consultations-page',
    },
    {
      name: 'ROUTE_PROFILE_FAVOURITES',
      path: '/FR/profile/favourites',
      expected: 'private-profile-page',
      expectedTracking: 'private-profile-page',
    },
    {
      name: 'ROUTE_PROFILE_PROPOSALS',
      path: '/FR/profile/proposals',
      expected: 'private-profile-page',
      expectedTracking: 'private-profile-page',
    },
    {
      name: 'ROUTE_PROFILE_FOLLOWING',
      path: '/FR/profile/following',
      expected: 'private-profile-page',
      expectedTracking: 'private-profile-page',
    },
    {
      name: 'ROUTE_PROFILE_OPINIONS',
      path: '/FR/profile/opinions',
      expected: 'private-profile-page',
      expectedTracking: 'private-profile-page',
    },
    {
      name: 'ROUTE_PERSONALITY_PROFILE',
      path: '/FR/profile/personality/1234',
      expected: 'public-profile-page',
      expectedTracking: 'public-profile-page',
    },
    {
      name: 'ROUTE_ORGANISATION_PROFILE',
      path: '/FR/profile/organisation/foo',
      expected: 'public-profile-page',
      expectedTracking: 'public-profile-page',
    },
    {
      name: 'ROUTE_SEARCH',
      path: '/FR/search',
      expected: 'search-page',
      expectedTracking: 'search-page',
    },
    {
      name: 'ROUTE_STATIC_NOCOOKIES',
      path: '/FR/no-cookies',
      expected: 'nocookies-page',
      expectedTracking: 'nocookies-page',
    },
    {
      name: 'ROUTE_STATIC_COOKIES',
      path: '/FR/cookies',
      expected: 'cookies-page',
      expectedTracking: 'cookies-page',
    },
    {
      name: 'ROUTE_STATIC_NOTFOUND',
      path: '/FR/not-found',
      expected: 'not-found-page',
      expectedTracking: 'not-found-page',
    },
    {
      name: 'ROUTE_BROWSE_CONSULTATIONS',
      path: '/FR/browse/consultations/page/1',
      expected: 'browse-consultations-page',
      expectedTracking: 'browse-consultations-page',
    },
    {
      name: 'ROUTE_BROWSE_RESULTS',
      path: '/FR/browse/results/page/1',
      expected: 'browse-results-page',
      expectedTracking: 'browse-results-page',
    },
    {
      name: 'home',
      path: '/',
      expected: 'homepage',
      expectedTracking: 'homepage',
    },
    {
      name: 'home fr',
      path: '/FR/',
      expected: 'homepage',
      expectedTracking: 'homepage',
    },
    {
      name: 'unknown location',
      path: '/Fr/ho-fake-route',
      expected: 'unknown-location /Fr/ho-fake-route',
      expectedTracking: 'unknown-location',
    },
  ];

  fixtures.map((record) => it(`get location context ${record.name}`, () => {
    expect(
      getLocationContext(
        record.path,
        record.params && record.params.questionId,
        record.params && record.params.proposalId
      )
    ).toBe(record.expected);
  }));

  fixtures.map((record) => it(`get tracking location context ${record.name}`, () => {
    expect(
      getTrackingLocation(
        record.path
      )
    ).toBe(record.expectedTracking);
  }));

  it('all routes have location', () => {
    const definedRoutes = Object.keys(routes)
      .filter((name) => name.includes('ROUTE_'))
      .map((name) => ({
        name,
        // eslint-disable-next-line import/namespace
        path: routes[name],
      }));

    const routesToExcludes = [
      'ROUTE_COUNTRY',
      'ROUTE_COUNTRY_LANG',
      'ROUTE_COUNTRY_FR',
      'ROUTE_CONSULTATION',
      'ROUTE_TOP_IDEAS',
      'ROUTE_ACCOUNT_ACTIVATION',
      'ROUTE_PASSWORD_RECOVERY',
      'ROUTE_PROFILE',
      'ROUTE_PROFILE_EDIT',
      'ROUTE_PROFILE_PROPOSALS',
      'ROUTE_PROFILE_FAVOURITES',
      'ROUTE_PROFILE_FOLLOWING',
      'ROUTE_ORGANISATION_PROFILE',
      'ROUTE_ORGANISATION_PROPOSALS',
      'ROUTE_ORGANISATION_VOTES',
      'ROUTE_STATIC_LEGAL_FR',
      'ROUTE_STATIC_GTU_FR',
      'ROUTE_STATIC_DATA_FR',
      'ROUTE_STATIC_CONTACT_FR',
      'ROUTE_STATIC_A11Y_FR',
      'ROUTE_STATIC_LEGAL_EN',
      'ROUTE_STATIC_GTU_EN',
      'ROUTE_STATIC_DATA_EN',
      'ROUTE_STATIC_LEGAL_DE',
      'ROUTE_STATIC_GTU_DE',
      'ROUTE_STATIC_DATA_DE',
      'ROUTE_STATIC_CONTACT_DE',
      'ROUTE_STATIC_A11Y_DE',
      'ROUTE_STATIC_NOCOOKIES',
      'ROUTE_CONSULTATION_STEP',
      'ROUTE_WHOAREWE',
      'ROUTE_PARTNERSHIP',
      'ROUTE_EXPLORE_ROOT',
      'ROUTE_EXPLORE_FIRST_PAGE',
    ];

    // .map(route => route.replace(/:/g, ''));
    const filteredRoutes = definedRoutes.filter(
      (route) => !routesToExcludes.includes(route.name)
    );
    filteredRoutes.forEach((route) => {
      const elementFromFixture = fixtures.find(
        (item) => item.name === route.name
      );
      if (!elementFromFixture) {
        throw new Error(`Not found. Route: ${route.name}`);
      }
      const pathFromFixtures = elementFromFixture.path;

      expect(pathFromFixtures !== undefined).toBe(true);

      expect({
        routeName: route.name,
        isReferencedLocation:
          getTrackingLocation(pathFromFixtures) !== 'unknown-location',
        pathFromFixtures,
      }).toStrictEqual({
        routeName: route.name,
        isReferencedLocation: true,
        pathFromFixtures,
      });
    });
  });
});
