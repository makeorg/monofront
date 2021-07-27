import { HomeViewType, SearchViewsType } from '@make.org/types';
import { ViewsApiService } from '@make.org/api/ViewsApiService';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const getHome = async (country: string): Promise<HomeViewType | null> => {
  try {
    const response = await ViewsApiService.getHome(country);

    return response ? response.data : null;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const searchViews = async (
  content: string,
  country: string,
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
      organisationLimit
    );

    return searchResponse ? searchResponse.data : null;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

export const ViewsService = {
  searchViews,
  getHome,
};
