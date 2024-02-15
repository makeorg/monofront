import { NextFunction, Request, Response } from 'express';
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';

export const SESSION_COOKIE_NAME = 'panoramic-session-id';
export const VISITOR_COOKIE_NAME = 'panoramic-visitor-id';

export const assemblyCookiesMiddleware =
  () =>
  (req: Request, res: Response, next: NextFunction): void => {
    const request = req as Request & { universalCookies: Cookies };

    const session = request.universalCookies.get(SESSION_COOKIE_NAME);
    const visitor = request.universalCookies.get(VISITOR_COOKIE_NAME);

    request.universalCookies.set(SESSION_COOKIE_NAME, session ?? uuidv4(), {
      maxAge: 20 * 60,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    request.universalCookies.set(VISITOR_COOKIE_NAME, visitor ?? uuidv4(), {
      expires: date,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return next();
  };
