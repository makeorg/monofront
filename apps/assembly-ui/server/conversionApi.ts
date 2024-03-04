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
export function renderConversionFacebook(
  fbConversionService: IConversionServerService<FbConversionEventClientType>
) {
  return (req: Request, res: Response): void => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    try {
      fbConversionService.callApiConversion(req.body);
    } catch (e) {
      getLoggerInstance().logError(e);
      res.status(500).send();
    }
    res.status(202).send();
  };
}

/**
 * twitter api conversion
 */
export function renderConversionTwitter(
  twConversionService: IConversionServerService<TwConversionEventClientType>
) {
  return (req: Request, res: Response): void => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    try {
      twConversionService.callApiConversion(req.body);
    } catch (e) {
      getLoggerInstance().logError(e);
      res.status(500).send();
    }
    res.status(202).send();
  };
}