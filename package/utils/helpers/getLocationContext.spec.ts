import {
  getRouteProfileFavourites,
  getRouteProfileOpinions,
  getRouteProfileProposals,
  getRouteProfileEdit,
  getRouteNoCookies,
} from '../routes';
import {
  getHomeLink,
  getParticipateLink,
  getExploreLink,
  getResultsLink,
  getTopIdeaDetailsLink,
  getTopIdeasLink,
  getSequencePopularLink,
  getSequenceControversialLink,
  getSequenceKeywordLink,
  getSequenceLink,
  getProposalLink,
  getOrganisationProfileLink,
  getPersonalityProfileLink,
  getCookiesPageLink,
  getBrowseConsultationsLink,
  getBrowseResultsLink,
} from './url';
import { getAppTrackingLocation } from './getLocationContext';

const addTrailingSlash = (path: string) => `${path}/`;

describe('getAppTrackingLocation function', () => {
  it('participate location', () => {
    const path = getParticipateLink('FR', 'foo');
    expect(getAppTrackingLocation(path)).toBe('page-participate');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe(
      'page-participate'
    );
  });

  it('explore location', () => {
    const path = getExploreLink('FR', 'foo');
    expect(getAppTrackingLocation(path)).toBe('page-explore');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe('page-explore');
  });

  it('results location', () => {
    const path = getResultsLink('FR', 'foo');
    expect(getAppTrackingLocation(path)).toBe('page-results');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe('page-results');
  });

  it('Top Idea Details location', () => {
    const path = getTopIdeaDetailsLink('FR', 'foo', 'bar');
    expect(getAppTrackingLocation(path)).toBe('page-top-idea-details');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe(
      'page-top-idea-details'
    );
  });

  it('Top Idea location', () => {
    const path = getTopIdeasLink('FR', 'foo');
    expect(getAppTrackingLocation(path)).toBe('page-top-ideas');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe(
      'page-top-ideas'
    );
  });

  it('Sequence Popular location', () => {
    const path = getSequencePopularLink('FR', 'foo');
    expect(getAppTrackingLocation(path)).toBe('sequence-popular');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe(
      'sequence-popular'
    );
  });

  it('Sequence Controversial location', () => {
    const path = getSequenceControversialLink('FR', 'foo');
    expect(getAppTrackingLocation(path)).toBe('sequence-controversial');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe(
      'sequence-controversial'
    );
  });

  it('Sequence Keyword location', () => {
    const path = getSequenceKeywordLink('FR', 'foo', 'bar');
    expect(getAppTrackingLocation(path)).toBe('sequence-keyword');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe(
      'sequence-keyword'
    );
  });

  it('Sequence Standard location', () => {
    const path = getSequenceLink('FR', 'foo');
    expect(getAppTrackingLocation(path)).toBe('sequence');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe('sequence');
  });

  it('Proposal location', () => {
    const path = getProposalLink('FR', 'foo', 'bar', 'baz');
    expect(getAppTrackingLocation(path)).toBe('proposal-page');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe(
      'proposal-page'
    );
  });

  it('Search Proposals location', () => {
    expect(getAppTrackingLocation('/FR/search/proposals/page/1')).toBe(
      'search-proposals-page'
    );
    expect(
      getAppTrackingLocation(addTrailingSlash('/FR/search/proposals/page/1'))
    ).toBe('search-proposals-page');
  });

  it('Search Organisations location', () => {
    expect(getAppTrackingLocation('/FR/search/organisations')).toBe(
      'search-organisations-page'
    );
    expect(
      getAppTrackingLocation(addTrailingSlash('/FR/search/organisations'))
    ).toBe('search-organisations-page');
  });

  it('Search Consultations location', () => {
    expect(getAppTrackingLocation('/FR/search/consultations')).toBe(
      'search-consultations-page'
    );
    expect(
      getAppTrackingLocation(addTrailingSlash('/FR/search/consultations'))
    ).toBe('search-consultations-page');
  });

  it('Search location', () => {
    expect(getAppTrackingLocation('/FR/search')).toBe('search-page');
    expect(getAppTrackingLocation(addTrailingSlash('/FR/search'))).toBe(
      'search-page'
    );
  });

  it('Private Profile locations', () => {
    const editPath = getRouteProfileEdit('FR');
    const favoritesPath = getRouteProfileFavourites('FR', 1);
    const proposalsPath = getRouteProfileProposals('FR', 1);
    const opinionsPath = getRouteProfileOpinions('FR');

    expect(getAppTrackingLocation(editPath)).toBe('private-profile-page');
    expect(getAppTrackingLocation(favoritesPath)).toBe('private-profile-page');
    expect(getAppTrackingLocation(proposalsPath)).toBe('private-profile-page');
    expect(getAppTrackingLocation(opinionsPath)).toBe('private-profile-page');
    expect(getAppTrackingLocation(opinionsPath)).toBe('private-profile-page');
    expect(getAppTrackingLocation(addTrailingSlash(editPath))).toBe(
      'private-profile-page'
    );
    expect(getAppTrackingLocation(addTrailingSlash(favoritesPath))).toBe(
      'private-profile-page'
    );
    expect(getAppTrackingLocation(addTrailingSlash(proposalsPath))).toBe(
      'private-profile-page'
    );
    expect(getAppTrackingLocation(addTrailingSlash(opinionsPath))).toBe(
      'private-profile-page'
    );
    expect(getAppTrackingLocation(addTrailingSlash(opinionsPath))).toBe(
      'private-profile-page'
    );
  });

  it('Public Profile locations', () => {
    const organisationPath = getOrganisationProfileLink('FR', 'foo');
    const personalityPath = getPersonalityProfileLink('FR', 'foo');

    expect(getAppTrackingLocation(organisationPath)).toBe(
      'public-profile-page'
    );
    expect(getAppTrackingLocation(personalityPath)).toBe('public-profile-page');
    expect(getAppTrackingLocation(addTrailingSlash(organisationPath))).toBe(
      'public-profile-page'
    );
    expect(getAppTrackingLocation(addTrailingSlash(personalityPath))).toBe(
      'public-profile-page'
    );
  });

  it('No Cookies locations', () => {
    const path = getRouteNoCookies('FR');
    expect(getAppTrackingLocation(path)).toBe('nocookies-page');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe(
      'nocookies-page'
    );
  });

  it('Cookies locations', () => {
    const path = getCookiesPageLink('FR');
    expect(getAppTrackingLocation(path)).toBe('cookies-page');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe('cookies-page');
  });

  it('404 locations', () => {
    expect(getAppTrackingLocation('/FR/not-found')).toBe('not-found-page');
    expect(getAppTrackingLocation(addTrailingSlash('/FR/not-found'))).toBe(
      'not-found-page'
    );
  });

  it('Browse Consultations locations', () => {
    const path = getBrowseConsultationsLink('FR');
    expect(getAppTrackingLocation(path)).toBe('browse-consultations-page');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe(
      'browse-consultations-page'
    );
  });

  it('Browse Results locations', () => {
    const path = getBrowseResultsLink('FR');
    expect(getAppTrackingLocation(path)).toBe('browse-results-page');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe(
      'browse-results-page'
    );
  });

  it('Homepage location', () => {
    const root = addTrailingSlash('');
    const path = getHomeLink('FR');
    expect(getAppTrackingLocation(root)).toBe('homepage');
    expect(getAppTrackingLocation(path)).toBe('homepage');
    expect(getAppTrackingLocation(addTrailingSlash(path))).toBe('homepage');
  });

  it('Unknown location', () => {
    expect(getAppTrackingLocation(addTrailingSlash('/foo'))).toBe(
      'unknown-location'
    );
    expect(getAppTrackingLocation(addTrailingSlash('/foo'))).toBe(
      'unknown-location'
    );
  });
});
