import { env } from '@make.org/assets/env';
import {
  ROUTE_STATIC_GTU_CS,
  ROUTE_STATIC_GTU_DE,
  ROUTE_STATIC_GTU_EN,
  ROUTE_STATIC_GTU_FR,
  ROUTE_STATIC_GTU_UK,
} from '@make.org/utils/routes';
import * as urlHelper from './url';

const pathName = '/fooPath';
const aboutUrl = 'https://foo.bar/baz';
const country = 'FR';
const questionSlug = 'fooQuestionSlug';
const proposalId = 'fooProposalId';
const proposalSlug = 'fooProposalSlug';
const encodedKeyword = 'fookeyword';

jest.mock('@make.org/assets/env', () => ({
  env: {
    frontUrl: jest.fn(),
  },
}));

describe('Url Helper', () => {
  it('return relative current url', () => {
    const link = urlHelper.getRelativeCurrentUrl(pathName);

    expect(link).toEqual((env.frontUrl() || window.FRONT_URL) + pathName);
  });

  it('return about link with #partenaires anchor', () => {
    const link = urlHelper.getPartnerAnchor(aboutUrl);

    expect(link).toEqual(`${aboutUrl}#partenaires`);
  });

  it('return sequence link', () => {
    const link = urlHelper.getSequenceLink(country, questionSlug);

    expect(link).toEqual(`/${country}/consultation/${questionSlug}/selection`);
  });

  it('return sequence Popular link', () => {
    const link = urlHelper.getSequencePopularLink(country, questionSlug);

    expect(link).toEqual(
      `/${country}/consultation/${questionSlug}/selection-popular`
    );
  });

  it('return sequence Controversial link', () => {
    const link = urlHelper.getSequenceControversialLink(country, questionSlug);

    expect(link).toEqual(
      `/${country}/consultation/${questionSlug}/selection-controversial`
    );
  });

  it('return sequence keywords link', () => {
    const link = urlHelper.getSequenceKeywordLink(
      country,
      questionSlug,
      encodedKeyword
    );

    expect(link).toEqual(
      `/${country}/consultation/${questionSlug}/selection/keyword/${encodedKeyword}`
    );
  });

  it('return participate link', () => {
    const link = urlHelper.getParticipateLink(country, questionSlug);

    expect(link).toEqual(
      `/${country}/consultation/${questionSlug}/participate`
    );
  });

  it('return explore link', () => {
    const link = urlHelper.getExploreLink(country, questionSlug);

    expect(link).toEqual(
      `/${country}/consultation/${questionSlug}/explore/page/1`
    );
  });

  it('return proposal link', () => {
    const link = urlHelper.getProposalLink(
      country,
      questionSlug,
      proposalId,
      proposalSlug
    );

    expect(link).toEqual(
      `/${country}/consultation/${questionSlug}/proposal/${proposalId}/${proposalSlug}`
    );
  });

  it('return cookies page link', () => {
    const link = urlHelper.getCookiesPageLink(country);

    expect(link).toEqual(`/${country}/cookies`);
  });

  it('return MultiLang Link', () => {
    const linkFR = urlHelper.getMultiLangStaticLink(
      'FR',
      ROUTE_STATIC_GTU_FR,
      ROUTE_STATIC_GTU_EN,
      ROUTE_STATIC_GTU_DE,
      ROUTE_STATIC_GTU_UK,
      ROUTE_STATIC_GTU_CS
    );
    const linkEN = urlHelper.getMultiLangStaticLink(
      'GB',
      ROUTE_STATIC_GTU_FR,
      ROUTE_STATIC_GTU_EN,
      ROUTE_STATIC_GTU_DE,
      ROUTE_STATIC_GTU_UK,
      ROUTE_STATIC_GTU_CS
    );
    const linkDE = urlHelper.getMultiLangStaticLink(
      'DE',
      ROUTE_STATIC_GTU_FR,
      ROUTE_STATIC_GTU_EN,
      ROUTE_STATIC_GTU_DE,
      ROUTE_STATIC_GTU_UK,
      ROUTE_STATIC_GTU_CS
    );
    const linkUA = urlHelper.getMultiLangStaticLink(
      'UA',
      ROUTE_STATIC_GTU_FR,
      ROUTE_STATIC_GTU_EN,
      ROUTE_STATIC_GTU_DE,
      ROUTE_STATIC_GTU_UK,
      ROUTE_STATIC_GTU_CS
    );

    const linkCZ = urlHelper.getMultiLangStaticLink(
      'CZ',
      ROUTE_STATIC_GTU_FR,
      ROUTE_STATIC_GTU_EN,
      ROUTE_STATIC_GTU_DE,
      ROUTE_STATIC_GTU_UK,
      ROUTE_STATIC_GTU_CS
    );

    expect(linkFR).toEqual(`/FR/conditions-dutilisation`);
    expect(linkEN).toEqual(`/GB/terms-of-use`);
    expect(linkDE).toEqual(`/DE/nutzungsbedingungen`);
    expect(linkUA).toEqual(`/UA/terms-of-use`);
    expect(linkCZ).toEqual(`/CZ/terms-of-use`);
  });
});
