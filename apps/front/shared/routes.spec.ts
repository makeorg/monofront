import {
  getRouteProfile,
  getRouteProfileEdit,
  ROUTE_PARTICIPATE,
  ROUTE_EXPLORE,
  matchRoute,
  ROUTE_SEQUENCE,
  getRouteOrganisationProposals,
  getRouteOrganisationVotes,
  getRouteProfileProposals,
  getRouteProfileFavourites,
  getRouteProfileOpinions,
  getRouteNoCookies,
  getRouteSearch,
  getRouteSearchProposals,
  getRouteSearchOrganisations,
  getRouteSearchConsultations,
} from './routes';

describe('match Routes', () => {
  it('match route participate', () => {
    expect(
      matchRoute('/FR/consultation/1234/participate', ROUTE_PARTICIPATE)
    ).toBe(true);
  });

  it('match route explore', () => {
    expect(
      matchRoute('/FR/consultation/1234/explore/page/1', ROUTE_EXPLORE)
    ).toBe(true);
  });

  it('do not match route consultation', () => {
    expect(
      matchRoute('/FR/consultation/1234/consultation', ROUTE_SEQUENCE)
    ).toBe(false);
  });
});

describe('build Routes', () => {
  it('getRouteOrganisationProposals', () => {
    expect(getRouteOrganisationProposals('FR', 'fooOrg')).toBe(
      '/FR/profile/organisation/fooOrg/proposals'
    );
  });

  it('getRouteOrganisationVotes', () => {
    expect(getRouteOrganisationVotes('FR', 'fooOrg')).toBe(
      '/FR/profile/organisation/fooOrg/votes'
    );
  });

  it('getRouteProfile', () => {
    expect(getRouteProfile('FR')).toBe('/FR/profile');
  });

  it('getRouteProfileEdit', () => {
    expect(getRouteProfileEdit('FR')).toBe('/FR/profile/edit');
  });

  it('getRouteProfileProposals', () => {
    expect(getRouteProfileProposals('FR')).toBe('/FR/profile/proposals');
  });

  it('getRouteProfileFavourites', () => {
    expect(getRouteProfileFavourites('FR')).toBe('/FR/profile/favourites');
  });

  it('getRouteProfileOpinions', () => {
    expect(getRouteProfileOpinions('FR')).toBe('/FR/profile/opinions');
  });

  it('getRouteNoCookies', () => {
    expect(getRouteNoCookies('FR')).toBe('/FR/no-cookies');
  });

  it('getRouteSearch', () => {
    expect(getRouteSearch('FR', 'fooQuery')).toBe('/FR/search?query=fooQuery');
  });

  it('getRouteSearchProposals', () => {
    expect(getRouteSearchProposals('FR', 'fooQuery')).toBe(
      '/FR/search/proposals?query=fooQuery'
    );
  });

  it('getRouteSearchConsultations', () => {
    expect(getRouteSearchConsultations('FR', 'fooQuery')).toBe(
      '/FR/search/consultations?query=fooQuery'
    );
  });

  it('getRouteSearchOrganisations', () => {
    expect(getRouteSearchOrganisations('FR', 'fooQuery')).toBe(
      '/FR/search/organisations?query=fooQuery'
    );
  });
});
