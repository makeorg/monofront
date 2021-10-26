import React, { useState } from 'react';
import i18n from 'i18next';
import { useParams, useHistory } from 'react-router';
import {
  QuestionType,
  TypeFilterAndSortValues,
  QuestionKeywordType,
} from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { updateFilterAndSortState } from '@make.org/store/actions/filterAndSort';
import { SORT_RECENT } from '@make.org/utils/constants/explore';
import { checkIsFeatureActivated } from '@make.org/utils/helpers/featureFlipping';
import { FEATURE_FLIPPING } from '@make.org/types/enums';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { getExploreLink } from '@make.org/utils/helpers/url';
import { getUpdatedFilterAndSortValues } from '../../../helper/filterAndSort';
import { SortComponent } from './Sort';
import { FiltersComponent } from './Filter';
import {
  FilterBlockStyle,
  FiltersWrapperStyle,
  FiltersTitleStyle,
  SvgArrowsGroup,
} from './style';

type Props = {
  keywords: QuestionKeywordType[];
};

// handle className for sort and keyword button and radio css
const handleClassName = (
  currentValue: string | undefined,
  elementValue: string
): string => {
  if (elementValue === currentValue) {
    return 'selected';
  }
  return '';
};

export const FilterAndSort: React.FC<Props> = ({ keywords }: Props) => {
  const [currentSort, setCurrentSort] = useState<string>(SORT_RECENT);
  const { state, dispatch } = useAppContext();
  const history = useHistory();
  const { filterAndSort } = state;
  const { country, pageId } = useParams<{ country: string; pageId: string }>();
  const question: QuestionType = selectCurrentQuestion(state);
  const handleChange = (name: string, value?: string) => {
    const newFilterAndSortValues: TypeFilterAndSortValues =
      getUpdatedFilterAndSortValues(filterAndSort, name, value);
    dispatch(updateFilterAndSortState(newFilterAndSortValues));
    // redirects to first page when changing filters and/or sort in pagination
    if (pageId !== '1') {
      history.push(getExploreLink(country, question.slug));
    }
  };
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
        <SortComponent
          handleClassName={handleClassName}
          handleChange={handleChange}
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
        />
      </FilterBlockStyle>
      {isKeywordActive && (
        <FiltersComponent
          handleClassName={handleClassName}
          handleChange={handleChange}
          setCurrentSort={setCurrentSort}
          keywords={keywords}
          filterAndSortValues={filterAndSort}
          question={question}
        />
      )}
    </FiltersWrapperStyle>
  );
};
