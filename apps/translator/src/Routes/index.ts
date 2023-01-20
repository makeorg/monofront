import { checkSchema, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { RoutesInput } from '../Types/types';
import { getVersion } from '../Controllers/Version.controller';
import { translationDemandSchemaValidator } from '../Validator/translationDemandValidator';
import {
  postTranslate,
  getSupportedLanguages,
} from '../Controllers/Main.controller';

const SUPPORTED_LANGUAGE_PATH = '/supported-languages';
const VERSION_PATH = '/version';
const TRANSLATE_PATH = '/translate';
const ROOT_PATH = '/';

export const UNSECURED_ROUTES = [
  VERSION_PATH,
  SUPPORTED_LANGUAGE_PATH,
  ROOT_PATH,
];

export const Routes = ({ app }: RoutesInput): void => {
  app.get('/', (_: Request, res: Response) =>
    res.json({ message: 'Welcome - Translator service' })
  );

  app.get(VERSION_PATH, async (_: Request, res: Response) => getVersion(res));

  app.post(
    TRANSLATE_PATH,
    checkSchema(translationDemandSchemaValidator),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      return postTranslate(req, res);
    }
  );

  app.get(SUPPORTED_LANGUAGE_PATH, async (req: Request, res: Response) =>
    getSupportedLanguages(req, res)
  );

  app.get('*', (_: Request, res: Response) => {
    res.status(404).json({ message: 'Not found' });
  });
};
