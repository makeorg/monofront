import { IDS } from '@make.org/types/enums';
import i18n from 'i18next';
import { QuestionType } from '@make.org/types';
import { isParticipatePage, isResultsPage } from '@make.org/utils/routes';

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
    case IDS.RESULTS_TOP_IDEAS:
      return 'top-ideas';
    case IDS.RESULTS_CONTROVERSIALS:
      return 'proposals-controversials';
    case IDS.RESULTS_CARTOGRAPHY:
      return 'cartography';
    case IDS.RESULTS_PARTICIPATION:
      return 'participants-chart';
    default:
      return '';
  }
};
