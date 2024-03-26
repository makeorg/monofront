import { useEffect } from 'react';
import {
  isHomepage,
  isBrowseConsultationsPage,
  isBrowseResultsPage,
  isHomepageWithLocale,
} from '@make.org/utils/routes';
import { ClientLogger } from '@make.org/logger/clientLogger';

export const usePageBackgoundColor = (locationPath: string): void => {
  useEffect(() => {
    const pageWrapper = document.getElementById('page_wrapper');
    const whiteBackgroundPage =
      isHomepageWithLocale(locationPath) ||
      isHomepage(locationPath) ||
      isBrowseConsultationsPage(locationPath) ||
      isBrowseResultsPage(locationPath);

    if (!pageWrapper) {
      return ClientLogger.getInstance().logError({
        message:
          'Error in usePageBackgroundColor hook, page_wrapper is was not found',
        name: 'hooks',
      });
    }

    if (whiteBackgroundPage) {
      return pageWrapper.classList.add('white');
    }

    return pageWrapper.classList.remove('white');
  }, [locationPath]);
};
