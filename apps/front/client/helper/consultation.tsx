// flow
import {
  RESULTS_TOP_IDEAS,
  RESULTS_CONTROVERSIALS,
  RESULTS_CARTOGRAPHY,
  RESULTS_PARTICIPATION,
} from '@make.org/utils/constants/ids';

import i18n from 'i18next';
import { QuestionType } from '@make.org/types';
import { isParticipatePage, isResultsPage } from '../../shared/routes';

/**
 * Renders current page Breadcrumb depending on location
 * @param  {string} location
 * @param  {Object} question
 * @return {string || null}
 */

export const getCurrentLabel = (
  locationPathname: string,
  question: QuestionType
): string => {
  if (isParticipatePage(locationPathname)) {
    return i18n.t('consultation.navigation.participate_breadcrumb', {
      title: question.wording.title,
    });
  }
  if (isResultsPage(locationPathname)) {
    return i18n.t('consultation.results.breadcrumb', {
      title: question.wording.title,
    });
  }
  return i18n.t('consultation.navigation.explore_breadcrumb', {
    title: question.wording.title,
  });
};

export const getCurrentContainer = (id: string): string => {
  switch (id) {
    case RESULTS_TOP_IDEAS:
      return 'top-ideas';
    case RESULTS_CONTROVERSIALS:
      return 'proposals-controversials';
    case RESULTS_CARTOGRAPHY:
      return 'cartography';
    case RESULTS_PARTICIPATION:
      return 'participants-chart';
    default:
      return '';
  }
};
