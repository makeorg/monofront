import { AxiosResponse } from 'axios';
import {
  CountryWithConsulationsType,
  HomeViewType,
} from '@make.org/types/View';
import { ApiService } from '@make.org/api/ApiService';

// @todo remove it when ready on API side
const HOMEPAGE_PATH = '/views/home-page/:country';
const SEARCH_VIEWS_PATH =
  '/views/search?content=:content&proposalLimit=:proposalLimit&questionLimit=:questionLimit&organisationLimit=:organisationLimit&country=:country&preferredLanguage=:preferredLanguage';
const COUNTRIES_PATH = '/views/countries';

export class ViewsApiService {
  static getCountries = async (
    headers?: Record<string, string>
  ): Promise<void | AxiosResponse<CountryWithConsulationsType[]>> =>
    ApiService.callApi(COUNTRIES_PATH, {
      method: 'GET',
      headers,
    });

  static getHome = async (
    country: string,
    preferredLanguage: string,
    headers?: Record<string, string>
  ): Promise<void | AxiosResponse<HomeViewType>> =>
    ApiService.callApi(HOMEPAGE_PATH.replace(':country', country), {
      method: 'GET',
      headers,
      params: {
        preferredLanguage,
      },
    });

  static searchViews = async (
    content: string,
    country: string,
    proposalLimit: number,
    questionLimit: number,
    organisationLimit: number,
    preferredLanguage: string
  ): Promise<void | AxiosResponse> =>
    ApiService.callApi(
      SEARCH_VIEWS_PATH.replace(':content', content)
        .replace(':proposalLimit', proposalLimit.toString())
        .replace(':questionLimit', questionLimit.toString())
        .replace(':organisationLimit', organisationLimit.toString())
        .replace(':country', country)
        .replace(':preferredLanguage', preferredLanguage),
      {
        method: 'GET',
      }
    );
}
