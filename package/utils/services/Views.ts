import { HomeViewType, SearchViewsType } from '@make.org/types';
import { ViewsApiService } from '@make.org/api/ViewsApiService';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const getHome = async (
  country: string,
  preferredLanguage: string
): Promise<HomeViewType | null> => {
  try {
    const response = await ViewsApiService.getHome(country, preferredLanguage);

    return response ? response.data : null;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const searchViews = async (
  content: string,
  country: string,
  preferredLanguage: string,
  proposalLimit = 4,
  questionLimit = 4,
  organisationLimit = 4
): Promise<SearchViewsType | null> => {
  try {
    const searchResponse = await ViewsApiService.searchViews(
      content,
      country,
      proposalLimit,
      questionLimit,
      organisationLimit,
      preferredLanguage
    );

    return searchResponse ? searchResponse.data : null;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

export const ViewsService = {
  searchViews,
  getHome,
};
