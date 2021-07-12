/* @flow */
import * as socialHelper from './social';

const socialPathName = 'foo';
const socialMessage = 'bar';
const twitterHashtag = 'baz';

jest.mock('Shared/helpers/url', () => ({
  getRelativeCurrentUrl: (pathname) => pathname,
}));

describe('Social Helper', () => {
  describe('facebookShareUrl Function', () => {
    it('return facebook sharing link with path params', () => {
      const link = socialHelper.facebookShareUrl(socialPathName);
      expect(link).toBe(
        `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          socialPathName
        )}`
      );
    });
  });
  describe('twitterShareUrl Function', () => {
    it('return twitter sharing link with path params', () => {
      const link = socialHelper.twitterShareUrl(socialPathName);
      expect(link).toBe(
        `https://twitter.com/intent/tweet/?text=&hashtags=&url=${encodeURIComponent(
          socialPathName
        )}`
      );
    });

    it('return twitter sharing link with path & text params', () => {
      const link = socialHelper.twitterShareUrl(socialPathName, socialMessage);
      expect(link).toBe(
        `https://twitter.com/intent/tweet/?text=${encodeURIComponent(
          socialMessage
        )}&hashtags=&url=${encodeURIComponent(socialPathName)}`
      );
    });

    it('return twitter sharing link with path, text & hashtag params', () => {
      const link = socialHelper.twitterShareUrl(
        socialPathName,
        socialMessage,
        twitterHashtag
      );
      expect(link).toBe(
        `https://twitter.com/intent/tweet/?text=${encodeURIComponent(
          socialMessage
        )}&hashtags=${encodeURIComponent(
          twitterHashtag
        )}&url=${encodeURIComponent(socialPathName)}`
      );
    });
  });
  describe('linkedinShareUrl Function', () => {
    it('return linkedin sharing link with path params', () => {
      const link = socialHelper.linkedinShareUrl(socialPathName);
      expect(link).toBe(
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          socialPathName
        )}&title=&summary=&source=${encodeURIComponent(socialPathName)}`
      );
    });

    it('return linkedin sharing link with path & message params', () => {
      const link = socialHelper.linkedinShareUrl(socialPathName, socialMessage);
      expect(link).toBe(
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          socialPathName
        )}&title=${encodeURIComponent(
          socialMessage
        )}&summary=${encodeURIComponent(
          socialMessage
        )}&source=${encodeURIComponent(socialPathName)}`
      );
    });
  });
});
