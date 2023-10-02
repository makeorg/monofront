import { Request, Response } from 'express';
import axios from 'axios';
import { createHmac, randomBytes } from 'crypto';
import { getLoggerInstance } from '@make.org/logger';
import { env } from '@make.org/assets/env';
import { TwEventType } from '@make.org/types/TwEvents';

type OAuthParamsType = {
  oauth_consumer_key: string;
  oauth_token: string;
  oauth_timestamp: number;
  oauth_nonce: string;
  oauth_signature_method: string;
  oauth_version: string;
};

type TwErrorResponse = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: { errors: []; request: Record<string, string>[] };
};

const twApiVersion = 12;
const twPixelId: string = env.twPixelId();
const TW_CONSUMER_API_KEY = env.twAPIKey();
const TW_CONSUMER_API_SECRET = env.twAPISecret();
const TW_ACCESS_TOKEN = env.twAccessToken();
const TW_TOKEN_SECRET = env.twTokenSecret();

const callTwApiConversion = (
  apiVersion: number,
  pixelId: string,
  data?: TwEventType
): void => {
  const logger = getLoggerInstance();

  if (!TW_ACCESS_TOKEN) {
    logger.logWarning('TW conversion token is not defined');
    return;
  }
  const httpMethod = 'POST';
  const url = `https://ads-api.twitter.com/${apiVersion}/measurement/conversions/${pixelId}`;

  // Waring params must be sorted alphabatically
  const OAuthParams: OAuthParamsType = {
    oauth_consumer_key: TW_CONSUMER_API_KEY,
    oauth_nonce: randomBytes(16).toString('base64'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_token: TW_ACCESS_TOKEN,
    oauth_version: '1.0',
  };

  const OAuthHeaders = Object.entries(OAuthParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}="${encodeURIComponent(value)}"`
    )
    .join(',');

  const OAuthParamsString = Object.entries(OAuthParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  const OAuthSignatureBase = `${httpMethod}&${encodeURIComponent(
    url
  )}&${encodeURIComponent(OAuthParamsString)}`;

  const signingKey = `${encodeURIComponent(
    TW_CONSUMER_API_SECRET
  )}&${encodeURIComponent(TW_TOKEN_SECRET)}`;

  const OAuthSignature = createHmac('sha1', signingKey)
    .update(OAuthSignatureBase)
    .digest('base64');

  axios({
    method: httpMethod,
    url,
    headers: {
      Authorization: `OAuth ${OAuthHeaders}, oauth_signature="${encodeURIComponent(
        OAuthSignature
      )}"`,
    },
    data: {
      data,
    },
  }).catch((error: { response: TwErrorResponse }) => {
    logger.logError({
      message: JSON.stringify(error.response.data.errors),
      name: 'tw-api-conversion',
      app_request_data: error.response.data.request,
      app_response_data: error.response.data,
    });
  });
};

export const tWConversionApi = async (
  req: Request,
  res: Response
): Promise<Response> => {
  callTwApiConversion(twApiVersion, twPixelId, req.body);

  return res.sendStatus(202);
};
