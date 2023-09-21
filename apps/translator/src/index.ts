import express, { Application, NextFunction, Request, Response } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import { env } from './env';
import { Routes } from './Routes';
import { headersResponseMiddleware } from './Middlewares/headersResponse';
import { appNameHeaderMiddleware } from './Middlewares/appNameHeader';
import { initLogger, getBaseLoggerInstance } from './Logger/logger';
import { securityMiddleware } from './Middlewares/security';
import { requestIdMiddleware } from './Middlewares/requestId';

export const app: Application = express();
initLogger();

app.use(compression());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  (
    err: { status?: number; type: string },
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err?.status === 400 && err.type === 'entity.parse.failed') {
      return res
        .json({ errors: [{ msg: 'Invalid json format', location: 'body' }] })
        .status(400)
        .send();
    }
    getBaseLoggerInstance().logError(err);

    return next();
  }
);
app.use(cors());
app.use((_, res, next) =>
  headersResponseMiddleware(
    {
      Server: 'MakeTranslator',
      'X-Powered-By': 'MakeArmada',
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '0',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'deny',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Content-Type': 'application/json',
      Expires: '0',
      Pragma: 'no-cache',
    },
    res,
    next
  )
);
app.use((req, res, next) => requestIdMiddleware(req, res, next));
app.use((req, res, next) => appNameHeaderMiddleware(req, res, next));
app.use((req, res, next) => securityMiddleware(req, res, next));
Routes({ app });
const logger = getBaseLoggerInstance();

if (!env.port()) {
  logger.logError('PORT env is not defined. Server not start.');
  process.exit(1);
}

app.listen(env.port(), () => {
  logger.logInfo({
    name: 'start-app',
    message: `server is running on PORT ${env.port()}`,
  });
});
