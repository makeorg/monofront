import { Request } from 'express';
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';

type requestUniversalCookieType = { universalCookies?: Cookies };

export const SESSION_COOKIE_NAME = 'panoramic-session-id';
export const VISITOR_COOKIE_NAME = 'panoramic-visitor-id';

export const CookiesManager = {
  renew: (req: Request): void => {
    const request = req as Request & requestUniversalCookieType;
    if (!request.universalCookies) {
      return;
    }

    const session = request.universalCookies.get(SESSION_COOKIE_NAME);
    const visitor = request.universalCookies.get(VISITOR_COOKIE_NAME);

    if (session) {
      request.universalCookies.set(SESSION_COOKIE_NAME, session, {
        maxAge: 20 * 60,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
    }

    if (visitor) {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);

      request.universalCookies.set(VISITOR_COOKIE_NAME, visitor, {
        expires: date,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
    }
  },
  addVisitor: (req: Request): void => {
    const request = req as Request & requestUniversalCookieType;
    if (!request.universalCookies) {
      return;
    }
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    request.universalCookies.set(VISITOR_COOKIE_NAME, uuidv4(), {
      expires: date,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  },
  addSession: (req: Request): void => {
    const request = req as Request & requestUniversalCookieType;
    if (!request.universalCookies) {
      return;
    }

    request.universalCookies.set(SESSION_COOKIE_NAME, uuidv4(), {
      maxAge: 20 * 60,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  },
  removeVisitor: (req: Request): void => {
    const request = req as Request & requestUniversalCookieType;
    if (!request.universalCookies) {
      return;
    }

    request.universalCookies.remove(VISITOR_COOKIE_NAME);
  },
  removeSession: (req: Request): void => {
    const request = req as Request & requestUniversalCookieType;
    if (!request.universalCookies) {
      return;
    }

    request.universalCookies.remove(SESSION_COOKIE_NAME);
  },
  getSession: (req: Request): string | null => {
    const request = req as Request & requestUniversalCookieType;
    if (!request.universalCookies) {
      return null;
    }

    return request.universalCookies.get(SESSION_COOKIE_NAME);
  },
  getVisitor: (req: Request): string | null => {
    const request = req as Request & requestUniversalCookieType;
    if (!request.universalCookies) {
      return null;
    }

    return request.universalCookies.get(VISITOR_COOKIE_NAME);
  },
};
