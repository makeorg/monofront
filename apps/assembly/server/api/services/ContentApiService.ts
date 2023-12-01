import { AxiosResponse } from 'axios';
import { ApiServiceShared } from '@make.org/api/ApiService/ApiService.shared';
import { env } from '../../../utils/env';

const ContentApi = new ApiServiceShared(env.contentUrlServerSide() as string);

const EVENT_PATH = '/assembly/events/:eventSlugOrId';
const TERM_QUERIES_PATH = '/assembly/events/:eventSlugOrId/termQueries';
const GENERATED_CONTENTS_PATH =
  '/assembly/events/:eventSlugOrId/generatedContent';

export class ContentApiService {
  static getEvent(
    eventSlugOrId: string,
    headers?: Record<string, string>
  ): Promise<void | AxiosResponse> {
    return ContentApi.callApi(
      EVENT_PATH.replace(':eventSlugOrId', eventSlugOrId),
      {
        method: 'GET',
        headers,
      }
    );
  }

  static getTermQueries(
    eventSlugOrId: string,
    headers?: Record<string, string>
  ): Promise<void | AxiosResponse> {
    return ContentApi.callApi(
      TERM_QUERIES_PATH.replace(':eventSlugOrId', eventSlugOrId),
      {
        method: 'GET',
        headers,
      }
    );
  }

  static getGeneratedContents(
    eventSlugOrId: string,
    headers?: Record<string, string>
  ): Promise<void | AxiosResponse> {
    return ContentApi.callApi(
      GENERATED_CONTENTS_PATH.replace(':eventSlugOrId', eventSlugOrId),
      {
        method: 'GET',
        headers,
      }
    );
  }
}
