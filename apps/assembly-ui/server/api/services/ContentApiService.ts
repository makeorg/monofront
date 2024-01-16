import { AxiosResponse } from 'axios';
import { ApiServiceShared } from '@make.org/api/ApiService/ApiService.shared';
import { env } from '../../../utils/env';

const ContentApi = new ApiServiceShared(env.contentUrlServerSide() as string);

const CUSTOMERS_PATH = '/assembly/customers';
const EVENTS_PATH = '/assembly/events';
const TERM_QUERIES_PATH = '/assembly/events/:eventId/termQueries';
const GENERATED_CONTENTS_PATH = '/assembly/events/:eventId/generatedContent';

export class ContentApiService {
  static getCustomers(
    slug?: string,
    headers?: Record<string, string>
  ): Promise<void | AxiosResponse> {
    return ContentApi.callApi(CUSTOMERS_PATH, {
      params: { slug },
      method: 'GET',
      headers,
    });
  }

  static getEvents(
    slug?: string,
    headers?: Record<string, string>
  ): Promise<void | AxiosResponse> {
    return ContentApi.callApi(EVENTS_PATH, {
      params: { slug },
      method: 'GET',
      headers,
    });
  }

  static getTermQueries(
    eventId: string,
    _start?: number,
    _end?: number,
    headers?: Record<string, string>
  ): Promise<void | AxiosResponse> {
    return ContentApi.callApi(TERM_QUERIES_PATH.replace(':eventId', eventId), {
      method: 'GET',
      headers,
      params: {
        _start,
        _end,
      },
    });
  }

  static getGeneratedContents(
    eventId: string,
    headers?: Record<string, string>
  ): Promise<void | AxiosResponse> {
    return ContentApi.callApi(
      GENERATED_CONTENTS_PATH.replace(':eventId', eventId),
      {
        method: 'GET',
        headers,
      }
    );
  }
}
