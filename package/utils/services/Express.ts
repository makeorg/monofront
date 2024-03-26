import {
  ILogger,
  QuestionResultsType,
  TrackingConfigurationParamType,
} from '@make.org/types';
import { ExpressApiService } from '@make.org/api/services/ExpressApiService';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { FbEventClientType } from '@make.org/types/FbEvents';
import { TwConversionType } from '@make.org/types/TwEvents';
import { defaultUnexpectedError } from './DefaultErrorHandler';

export class ExpressService {
  #pendindFbEvents = 0;

  #pendindTwEvents = 0;

  #apiService: ExpressApiService;

  #logger: ILogger;

  constructor(logger: ILogger) {
    this.#logger = logger;
    this.#apiService = new ExpressApiService();
  }

  async getResults(
    questionId: string,
    notFound: () => void = () => null
  ): Promise<QuestionResultsType | null> {
    try {
      const response = await this.#apiService.getResults(questionId);

      return response ? response.data : null;
    } catch (error: unknown) {
      const apiServiceError = error as ApiServiceError;
      if (apiServiceError.status === 404) {
        notFound();

        return null;
      }

      defaultUnexpectedError(apiServiceError);

      return null;
    }
  }

  static async #sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async sendFbEventConversion(
    eventName: string,
    eventId: string,
    params: TrackingConfigurationParamType,
    url: string | undefined,
    visitorId: string
  ): Promise<void> {
    const data: FbEventClientType = {
      event_name: eventName,
      user_data: {
        client_user_agent: navigator.userAgent || navigator.vendor,
        external_id: visitorId,
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
    await ExpressService.#sleep(3000);
    this.#apiService
      .sendFbEventConversion(data)
      .then(() => {
        this.#pendindFbEvents -= 1;
      })
      .catch(error => {
        this.#pendindFbEvents -= 1;
        this.#logger.logError(error);
      });
  }

  async sendTwEventConversion(
    eventName: string,
    twclid: string,
    conversionId?: string
  ): Promise<void> {
    const conversionEvent: TwConversionType = {
      conversionTime: new Date(),
      event_id: eventName,
      identifiers: [{ twclid }],
      conversion_id: conversionId,
    };

    this.#pendindTwEvents += 1;
    if (this.#pendindTwEvents > 100) {
      this.#logger.logWarning({
        name: 'tracking-twitter',
        message: `More than 100 tasks pending.  Pending: ${
          this.#pendindTwEvents
        }`,
      });
    }
    await ExpressService.#sleep(3000);
    this.#apiService
      .sendTwEventConversion({ conversions: [conversionEvent] })
      .then(() => {
        this.#pendindTwEvents -= 1;
      })
      .catch(error => {
        this.#pendindTwEvents -= 1;
        this.#logger.logError(error);
      });
  }
}
