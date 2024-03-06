import crypto from 'crypto';
import { FbConversionEventClientType, FbEventType } from '../types';
import {
  IClientService,
  IConversionClientService,
  IConversionServerService,
  IConversionService,
  ILogger,
} from '../interface';

export class FacebookConversion
  implements IConversionService<string, FbConversionEventClientType>
{
  // Ensure that conversion is received by FB after client track
  #waitingTime = 3000;

  #fbApiConversionVersion = 'v13.0';

  #pixelId: string;

  #logger: ILogger;

  #pendindFbEvents = 0;

  constructor(pixelId: string, logger?: ILogger) {
    this.#logger = logger ?? {
      // eslint-disable-next-line no-console
      logError: val => console.error(val),
      // eslint-disable-next-line no-console
      logInfo: val => console.info(val),
      // eslint-disable-next-line no-console
      logWarning: val => console.warn(val),
    };
    this.#pixelId = pixelId;
  }

  async #sendEventFromClient(
    clientService: IClientService,
    apiUrl: string,
    eventName: string,
    eventId: string,
    userId: string,
    params: Record<string, string>,
    url?: string
  ): Promise<void> {
    const data: FbConversionEventClientType = {
      event_name: eventName,
      user_data: {
        client_user_agent: navigator.userAgent || navigator.vendor,
        external_id: userId,
      },
      event_source_url: url || '',
      event_id: eventId,
      custom_data: params,
    };

    this.#pendindFbEvents += 1;
    if (this.#pendindFbEvents > 100) {
      this.#logger.logWarning({
        name: 'tracking-facebook',
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

  // eslint-disable-next-line class-methods-use-this
  #getDataWithHashedExternalId(data: FbEventType): FbEventType {
    const hashedData: FbEventType = { ...data };
    hashedData.user_data = {
      ...data.user_data,
      external_id: crypto
        .createHash('sha256')
        .update(data.user_data.external_id.toString())
        .digest('hex'),
    };

    return hashedData;
  }

  async #callApiConversion(
    clientService: IClientService,
    token: string,
    data: FbConversionEventClientType
  ): Promise<void> {
    if (!token) {
      this.#logger.logError('Facebook conversion token is undefined');
      return Promise.resolve();
    }

    const url = `https://graph.facebook.com/${this.#fbApiConversionVersion}/${
      this.#pixelId
    }/events?access_token=${token}`;

    const preparedData: FbEventType = this.#getDataWithHashedExternalId({
      ...data,
      data_processing_options_country: 0,
      data_processing_options_state: 0,
      opt_out: false,
      action_source: 'website',
      event_time: Math.floor(new Date().getTime() / 1000),
    });

    await clientService
      .callApi(url, {
        method: 'POST',
        body: {
          data: [preparedData],
          // test_event_code: 'TEST71326',
        },
      })
      .catch(error => {
        this.#logger.logError({
          message: error.message,
          name: 'fb-api-conversion',
          app_request_data: {
            data: [preparedData],
          },
          app_response_data: error?.response?.data,
        });
      });

    return Promise.resolve();
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
        userId?: string,
        url?: string
      ): Promise<void> =>
        this.#sendEventFromClient(
          clientService,
          apiUrl,
          eventName,
          eventId,
          userId ?? '',
          params,
          url
        ),
    };
  }

  getServerConversion(
    clientService: IClientService,
    token: string
  ): IConversionServerService<FbConversionEventClientType> {
    return {
      callApiConversion: async (
        data: FbConversionEventClientType
      ): Promise<void> => this.#callApiConversion(clientService, token, data),
    };
  }
}
