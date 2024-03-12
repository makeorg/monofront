import { Request, Response } from 'express';
import { getLoggerInstance } from '@make.org/logger';
import { CookiesManager } from '../cookiesManager';

export const consentRoute = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { performance } = req.body as {
      necessary?: boolean;
      performance?: boolean;
      functional?: boolean;
      advertising?: boolean;
    };

    if (performance) {
      CookiesManager.addSession(req);
      CookiesManager.addVisitor(req);
    }
    if (!performance) {
      CookiesManager.removeSession(req);
      CookiesManager.removeVisitor(req);
    }

    return res.status(200).send({
      sessionId: CookiesManager.getSession(req) ?? '',
      visitorId: CookiesManager.getVisitor(req) ?? '',
    });
  } catch (e) {
    getLoggerInstance().logError(e);
    return res.status(500).send();
  }
};
