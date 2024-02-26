import { Request, Response } from 'express';
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

    return res.sendStatus(200).send();
  } catch (e) {
    // toDo add logger
    return res.status(500).send();
  }
};
