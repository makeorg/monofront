import { AxiosResponse } from 'axios';
import { CountryWithConsulationsType, HomeViewType } from '../types/View';
import { ApiService } from './ApiService';

// @todo remove it when ready on API side
const HOMEPAGE_PATH = '/views/home-page/:country';
const SEARCH_VIEWS_PATH =
  '/views/search?content=:content&proposalLimit=:proposalLimit&questionLimit=:questionLimit&organisationLimit=:organisationLimit&country=:country';
const COUNTRIES_PATH = '/views/countries';

export class ViewsApiService {
  static getCountries = async (
    headers?: any
  ): Promise<void | AxiosResponse<CountryWithConsulationsType[]>> =>
    ApiService.callApi(COUNTRIES_PATH, {
      method: 'GET',
      headers,
    });

  static getHome = async (
    country: string,
    headers?: any
  ): Promise<void | AxiosResponse<HomeViewType>> =>
    ApiService.callApi(HOMEPAGE_PATH.replace(':country', country), {
      method: 'GET',
      headers,
    });

  static searchViews = async (
    content: string,
    country: string,
    proposalLimit: number,
    questionLimit: number,
    organisationLimit: number
  ): Promise<void | AxiosResponse> =>
    ApiService.callApi(
      SEARCH_VIEWS_PATH.replace(':content', content)
        .replace(':proposalLimit', proposalLimit.toString())
        .replace(':questionLimit', questionLimit.toString())
        .replace(':organisationLimit', organisationLimit.toString())
        .replace(':country', country),
      {
        method: 'GET',
      }
    );
}
