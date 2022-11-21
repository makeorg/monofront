import { facebookShareUrl, twitterShareUrl, linkedinShareUrl } from './social';

const socialPathName = 'foo';
const socialMessage = 'bar';
const twitterHashtag = 'baz';

jest.mock('./url', () => ({
  getRelativeCurrentUrl: (pathname: string) => pathname,
}));

describe('Social Helper', () => {
  describe('facebookShareUrl Function', () => {
    it('return facebook sharing link with path params', () => {
      const link = facebookShareUrl(socialPathName);
      expect(link).toBe(
        `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          socialPathName
        )}`
      );
    });
  });
  describe('twitterShareUrl Function', () => {
    it('return twitter sharing link with path params', () => {
      const link = twitterShareUrl(socialPathName);
      expect(link).toBe(
        `https://twitter.com/intent/tweet/?text=&hashtags=&url=${encodeURIComponent(
          socialPathName
        )}`
      );
    });

    it('return twitter sharing link with path & text params', () => {
      const link = twitterShareUrl(socialPathName, socialMessage);
      expect(link).toBe(
        `https://twitter.com/intent/tweet/?text=${encodeURIComponent(
          socialMessage
        )}&hashtags=&url=${encodeURIComponent(socialPathName)}`
      );
    });

    it('return twitter sharing link with path, text & hashtag params', () => {
      const link = twitterShareUrl(
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
      const link = linkedinShareUrl(socialPathName);
      expect(link).toBe(
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          socialPathName
        )}&title=&summary=&source=${encodeURIComponent(socialPathName)}`
      );
    });

    it('return linkedin sharing link with path & message params', () => {
      const link = linkedinShareUrl(socialPathName, socialMessage);
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
