import React from 'react';
import i18n from 'i18next';
import { QuestionType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { checkIsFeatureActivated } from '@make.org/utils/helpers/featureFlipping';
import { FEATURE_FLIPPING } from '@make.org/types/enums';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { SortComponent } from './Sort';
import { FiltersComponent } from './Filter';
import {
  FilterBlockStyle,
  FiltersWrapperStyle,
  FiltersTitleStyle,
  SvgArrowsGroup,
} from './style';

export const FilterAndSort: React.FC = () => {
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);

  const isKeywordActive: boolean = checkIsFeatureActivated(
    FEATURE_FLIPPING.CONSULTATION_KEYWORD_ACTIVE,
    question.activeFeatures
  );

  return (
    <FiltersWrapperStyle as="form">
      <FilterBlockStyle>
        <FiltersTitleStyle>
          <SvgArrowsGroup aria-hidden focusable="false" />
          {i18n.t('consultation.explore.sort_by')}
        </FiltersTitleStyle>
        <SortComponent />
      </FilterBlockStyle>
      {isKeywordActive && <FiltersComponent />}
    </FiltersWrapperStyle>
  );
};
