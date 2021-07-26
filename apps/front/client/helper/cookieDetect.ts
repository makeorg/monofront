export const cookieIsEnabled = (): boolean => {
  if (!navigator.cookieEnabled) {
    document.cookie = 'testcookie';
    if (document.cookie.indexOf('testcookie') === -1) {
      return false;
    }
  }
  return true;
};

export const thirdCookieEnabled = (thirdPartyCookieName: string): boolean => {
  if (document.cookie.indexOf(thirdPartyCookieName) === -1) {
    return false;
  }

  return true;
};
