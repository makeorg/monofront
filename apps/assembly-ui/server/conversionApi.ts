import { Request, Response } from 'express';
import { IConversionServerService } from '@make.org/tracking/interface';
import {
  FbConversionEventClientType,
  TwConversionEventClientType,
} from '@make.org/tracking/types';
import { getLoggerInstance } from '@make.org/logger';

/**
 * facebook api conversion
 */
export const renderConversionFacebook =
  (
    fbConversionService: IConversionServerService<FbConversionEventClientType>
  ) =>
  (req: Request, res: Response): void => {
    fbConversionService
      .callApiConversion(req.body)
      .catch(e => {
        getLoggerInstance().logError(e);
        res.status(500).send();
      })
      .then(() => res.status(202).send());
  };

/**
 * twitter api conversion
 */
export const renderConversionTwitter =
  (
    twConversionService: IConversionServerService<TwConversionEventClientType>
  ) =>
  (req: Request, res: Response): void => {
    twConversionService
      .callApiConversion(req.body)
      .catch(e => {
        getLoggerInstance().logError(e);
        res.status(500).send();
      })
      .then(() => res.status(202).send());
  };
