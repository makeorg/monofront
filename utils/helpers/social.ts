import { getRelativeCurrentUrl } from './url';

export const twitterShareUrl = (
  pathName = '',
  message = '',
  hashtags = ''
): string =>
  `https://twitter.com/intent/tweet/?text=${encodeURIComponent(
    message
  )}&hashtags=${encodeURIComponent(hashtags)}&url=${encodeURIComponent(
    getRelativeCurrentUrl(pathName)
  )}`;

export const facebookShareUrl = (pathName = ''): string =>
  `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    getRelativeCurrentUrl(pathName)
  )}`;

export const linkedinShareUrl = (pathName = '', message = ''): string =>
  `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    getRelativeCurrentUrl(pathName)
  )}&title=${encodeURIComponent(message)}&summary=${encodeURIComponent(
    message
  )}&source=${encodeURIComponent(getRelativeCurrentUrl(pathName))}`;

export const twitterMakeUrl = 'https://twitter.com/Make_org';
export const instagramMakeUrl = 'https://www.instagram.com/make_org/';
export const facebookMakeUrl = 'https://www.facebook.com/Make.org/';
export const linkedinMakeUrl = 'https://fr.linkedin.com/company/make.org';
