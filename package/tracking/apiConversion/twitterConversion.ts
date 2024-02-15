/* eslint-disable no-console */
import { createHmac, randomBytes } from 'crypto';
import {
  TwConversionSecret,
  TwConversionEventClientType,
  TwErrorResponse,
  TwOAuthParamsType,
} from '../types';
import {
  IClientService,
  IConversionClientService,
  IConversionServerService,
  IConversionService,
  ILogger,
} from '../interface';

export class TwitterConversion
  implements
    IConversionService<TwConversionSecret, TwConversionEventClientType>
{
  // Ensure that conversion is received by TW after client track
  #waitingTime = 3000;

  #pixelId: string;

  #logger: ILogger;

  #pendindFbEvents = 0;

  #apiConversionVersion = '12';

  constructor(pixelId: string, logger?: ILogger) {
    this.#logger = logger ?? {
      logError: val => console.error(val),
      logInfo: val => console.info(val),
      logWarning: val => console.warn(val),
    };
    this.#pixelId = pixelId;
  }

  async #sendEventFromClient(
    clientService: IClientService,
    apiUrl: string,
    eventName: string,
    eventId: string,
    identificationId: string,
    params: Record<string, string>,
    url?: string
  ): Promise<void> {
    const data: TwConversionEventClientType = {
      conversions: [
        {
          conversionTime: new Date(),
          event_id: eventName,
          identifiers: [{ twclid: identificationId }],
          conversion_id: eventId,
        },
      ],
    };

    this.#pendindFbEvents += 1;
    if (this.#pendindFbEvents > 100) {
      this.#logger.logWarning({
        name: 'tracking-twitter',
        message: `More than 100 tasks pending.  Pending: ${
          this.#pendindFbEvents
        }`,
      });
    }
    const sleep = (ms: number): Promise<void> =>
      new Promise(resolve => {
        setTimeout(resolve, ms);
      });

    await sleep(this.#waitingTime);

    clientService
      .callApi(apiUrl, {
        method: 'POST',
        body: data,
      })
      .then(() => {
        this.#pendindFbEvents -= 1;
      })
      .catch(error => {
        this.#pendindFbEvents -= 1;
        this.#logger.logError(error);
      });
  }

  #callApiConversion(
    clientService: IClientService,
    consumerApiKey: string,
    consumerApiSecret: string,
    accessToken: string,
    tokenSecret: string,
    data: TwConversionEventClientType
  ): void {
    if (!consumerApiKey) {
      this.#logger.logError('TW consumer api key is undefined');
      return;
    }
    if (!consumerApiSecret) {
      this.#logger.logError('TW consumer api secret is undefined');
      return;
    }
    if (!accessToken) {
      this.#logger.logError('TW access token is undefined');
      return;
    }
    if (!tokenSecret) {
      this.#logger.logError('TW token secret is undefined');
      return;
    }
    const url = `https://ads-api.twitter.com/${
      this.#apiConversionVersion
    }/measurement/conversions/${this.#pixelId}`;

    // Waring params must be sorted alphabatically
    const OAuthParams: TwOAuthParamsType = {
      oauth_consumer_key: consumerApiKey,
      oauth_nonce: randomBytes(16).toString('base64'),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000),
      oauth_token: accessToken,
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

    const OAuthSignatureBase = `POST&${encodeURIComponent(
      url
    )}&${encodeURIComponent(OAuthParamsString)}`;

    const signingKey = `${encodeURIComponent(
      consumerApiSecret
    )}&${encodeURIComponent(tokenSecret)}`;

    const OAuthSignature = createHmac('sha1', signingKey)
      .update(OAuthSignatureBase)
      .digest('base64');

    clientService
      .callApi(url, {
        method: 'POST',
        headers: {
          Authorization: `OAuth ${OAuthHeaders}, oauth_signature="${encodeURIComponent(
            OAuthSignature
          )}"`,
        },
        body: {
          data,
        },
      })
      .catch((error: { response: TwErrorResponse }) => {
        this.#logger.logError({
          message: JSON.stringify(error.response.data.errors),
          name: 'tw-api-conversion',
          app_request_data: error.response.data.request,
          app_response_data: error.response.data,
        });
      });
  }

  getClientConversion(
    clientService: IClientService,
    apiUrl: string
  ): IConversionClientService {
    return {
      sendEventFromClient: async (
        eventName: string,
        eventId: string,
        params: Record<string, string>,
        identificationId?: string,
        url?: string
      ): Promise<void> =>
        this.#sendEventFromClient(
          clientService,
          apiUrl,
          eventName,
          eventId,
          identificationId ?? '',
          params,
          url
        ),
    };
  }

  getServerConversion(
    clientService: IClientService,
    secret: TwConversionSecret
  ): IConversionServerService<TwConversionEventClientType> {
    return {
      callApiConversion: async (
        data: TwConversionEventClientType
      ): Promise<void> =>
        this.#callApiConversion(
          clientService,
          secret.consumerApiKey,
          secret.consumerApiSecret,
          secret.accessToken,
          secret.tokenSecret,
          data
        ),
    };
  }
}
