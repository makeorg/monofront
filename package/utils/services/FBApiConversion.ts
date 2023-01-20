import { Request, Response } from 'express';
import axios from 'axios';
import { getLoggerInstance } from '@make.org/logger';
import { FbEventType, FbEventClientType } from '@make.org/types/FbEvents';
import crypto from 'crypto';
import { env } from '@make.org/assets/env';

const makePixelId: string = env.fbPixelId();
const token: string = env.fbConversionToken();

const getDataWithHashedExternalId = (data: FbEventType): FbEventType => {
  const hashedData: FbEventType = { ...data };
  hashedData.user_data = {
    ...data.user_data,
    external_id: crypto
      .createHash('sha256')
      .update(data.user_data.external_id.toString())
      .digest('hex'),
  };

  return hashedData;
};

const callFbApiConversion = (
  apiVersion: string,
  pixelId: string,
  data: FbEventClientType
): void => {
  const logger = getLoggerInstance();

  if (!token) {
    logger.logWarning('FB conversion token is not defined');
    return;
  }

  const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${token}`;

  const preparedData: FbEventType = getDataWithHashedExternalId({
    ...data,
    data_processing_options_country: 0,
    data_processing_options_state: 0,
    opt_out: false,
    action_source: 'website',
    event_time: Math.floor(new Date().getTime() / 1000),
  });

  axios({
    method: 'POST',
    url,
    data: {
      data: [preparedData],
      // test_event_code: 'TEST76948',
    },
  }).catch(error => {
    logger.logError({
      message: error.message,
      name: 'fb-api-conversion',
      app_request_data: {
        data: [preparedData],
      },
      app_response_data: error?.response?.data,
    });
  });
};

export const fBConversionApi = async (
  req: Request,
  res: Response
): Promise<Response> => {
  callFbApiConversion('v13.0', makePixelId, req.body);

  return res.sendStatus(202);
};
