import { env } from '@make.org/assets/env';
import {
  ROUTE_STATIC_GTU,
  ROUTE_STATIC_GTU_DE,
  ROUTE_STATIC_GTU_FR,
} from '@make.org/utils/routes';
import { URL } from '@make.org/types/enums';
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

  // webflow partnership links
  it('return webflow partnership fr external link', () => {
    const link = urlHelper.getWebflowDynamicLink('fr', '/foo');
    expect(link).toEqual(`${URL.ABOUT_MAKE_LINK}fr/foo`);
  });

  it('return webflow partnership de external link', () => {
    const link = urlHelper.getWebflowDynamicLink('de', '/foo');
    expect(link).toEqual(`${URL.ABOUT_MAKE_LINK}de/foo`);
  });

  it('return webflow partnership en external link', () => {
    const link = urlHelper.getWebflowDynamicLink('en', '/foo');
    expect(link).toEqual(`${URL.ABOUT_MAKE_LINK}en/foo`);
  });

  it('return webflow partnership default external link', () => {
    const link = urlHelper.getWebflowDynamicLink('uk', '/foo');
    expect(link).toEqual(`${URL.ABOUT_MAKE_LINK}en/foo`);
  });

  // webflow whoarewe links
  it('return webflow whoarewe fr external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('fr', '/foo');
    expect(link).toEqual(`${URL.ABOUT_MAKE_LINK}fr/foo`);
  });

  it('return webflow whoarewe de external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('de', '/foo');
    expect(link).toEqual(`${URL.ABOUT_MAKE_LINK}de/foo`);
  });

  it('return webflow whoarewe en external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('en', '/foo');
    expect(link).toEqual(`${URL.ABOUT_MAKE_LINK}en/foo`);
  });

  it('return webflow whoarewe cs external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('cs', '/foo');
    expect(link).toEqual(`${URL.ABOUT_MAKE_LINK}cs/foo`);
  });

  it('return webflow whoarewe uk external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('uk', '/foo');
    expect(link).toEqual(`${URL.ABOUT_MAKE_LINK}uk/foo`);
  });

  // @todo temporary links for webglot, will need to be normalised
  it('return weglot en external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('bg', '/foo');
    expect(link).toEqual(`https://bg.about.make.org/de/about-us`);
  });
  it('return weglot en external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('es', '/foo');
    expect(link).toEqual(`https://es.about.make.org/de/about-us`);
  });
  it('return weglot en external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('fi', '/foo');
    expect(link).toEqual(`https://fi.about.make.org/de/about-us`);
  });
  it('return weglot en external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('it', '/foo');
    expect(link).toEqual(`https://it.about.make.org/de/about-us`);
  });
  it('return weglot en external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('nl', '/foo');
    expect(link).toEqual(`https://nl.about.make.org/de/about-us`);
  });
  it('return weglot en external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('pl', '/foo');
    expect(link).toEqual(`https://pl.about.make.org/de/about-us`);
  });
  it('return weglot en external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('ro', '/foo');
    expect(link).toEqual(`https://ro.about.make.org/de/about-us`);
  });

  it('return weglot default external link', () => {
    const link = urlHelper.getWhoAreWeDynamicLink('cd', '/foo');
    expect(link).toEqual(`${URL.ABOUT_MAKE_LINK}en/foo`);
  });

  it('return cookies page link', () => {
    const link = urlHelper.getCookiesPageLink(country);

    expect(link).toEqual(`/${country}/cookies`);
  });

  it('return MultiLang Link', () => {
    const linkFR = urlHelper.getMultiLangStaticLink(
      'FR',
      'fr',
      ROUTE_STATIC_GTU,
      ROUTE_STATIC_GTU_FR,
      ROUTE_STATIC_GTU_DE
    );
    const linkEN = urlHelper.getMultiLangStaticLink(
      'GB',
      'en',
      ROUTE_STATIC_GTU,
      ROUTE_STATIC_GTU_FR,
      ROUTE_STATIC_GTU_DE
    );
    const linkDE = urlHelper.getMultiLangStaticLink(
      'DE',
      'de',
      ROUTE_STATIC_GTU,
      ROUTE_STATIC_GTU_FR,
      ROUTE_STATIC_GTU_DE
    );
    const linkUA = urlHelper.getMultiLangStaticLink(
      'UA',
      'uk',
      ROUTE_STATIC_GTU,
      ROUTE_STATIC_GTU_FR,
      ROUTE_STATIC_GTU_DE
    );

    const linkCZ = urlHelper.getMultiLangStaticLink(
      'CZ',
      'cs',
      ROUTE_STATIC_GTU,
      ROUTE_STATIC_GTU_FR,
      ROUTE_STATIC_GTU_DE
    );

    expect(linkFR).toEqual(`/FR/conditions-dutilisation`);
    expect(linkEN).toEqual(`/GB/terms-of-use`);
    expect(linkDE).toEqual(`/DE/nutzungsbedingungen`);
    expect(linkUA).toEqual(`/UA/terms-of-use`);
    expect(linkCZ).toEqual(`/CZ/terms-of-use`);
  });
});
