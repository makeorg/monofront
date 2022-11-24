import axios, { AxiosResponse } from 'axios';
import { Response, NextFunction, Request } from 'express';
import { getLoggerInstance } from '../Logger/logger';
import { env } from '../env';
import { UNSECURED_ROUTES } from '../Routes';

const appName = 'Make.org-translator';
const requiredRole = 'ROLE_MODERATOR';

type UserType = {
  email: string;
  roles: string[];
};

const current = async (
  authorization: string,
  requestId: string,
  initialRes: Response
): Promise<UserType | null> => {
  try {
    const response: AxiosResponse = await axios({
      method: 'GET',
      url: `${env.authEndpoint()}`,
      headers: {
        Authorization: authorization,
        'content-type': 'application/json',
        'x-make-external-id': requestId,
        'x-make-app-name': appName,
        // 'x-make-source': '',
        // 'x-make-referrer': '',
      },
    });

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as Error & { status: number };
    if (apiServiceError.status === 401) {
      return null;
    }
    getLoggerInstance().logError(
      {
        app_error: error,
        app_message: 'Authentication failure',
        app_name: 'Security',
      },
      initialRes
    );

    return null;
  }
};

export const securityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  if (UNSECURED_ROUTES.includes(req.path)) {
    return next();
  }
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    getLoggerInstance().logInfo(
      {
        message: 'Missing authorization header',
        name: 'Security',
        app_path: req.path,
      },
      res
    );
    return res.status(401).send();
  }
  if (!authHeader) {
    getLoggerInstance().logInfo(
      {
        message: 'Authorization header not found',
        name: 'Security',
      },
      res
    );
    return res.status(401).send();
  }

  const user = await current(authHeader, req.requestId, res);

  if (!user) {
    getLoggerInstance().logInfo(
      {
        message: 'Could not retrieve user',
        name: 'Security',
      },
      res
    );

    return res.status(401).send();
  }
  if (!user.roles.includes(requiredRole)) {
    getLoggerInstance().logWarning(
      {
        message: 'User not authorized to access API',
        name: 'Security',
        app_user_email: user.email,
        app_user_roles: user.roles,
      },
      res
    );

    return res.status(403).send();
  }

  getLoggerInstance().logInfo(
    {
      message: 'User auth success',
      name: 'Security',
      app_user_email: user.email,
    },
    res
  );

  return next();
};
