import React, { useState } from 'react';
import { useAppContext } from '@make.org/store';
import { useParams, useHistory } from 'react-router';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { trackClickSort } from '@make.org/utils/services/Tracking';
import { SORT_RECENT } from '@make.org/utils/constants/explore';
import { getExploreLink } from '@make.org/utils/helpers/url';
import { TypeSortValues, QuestionType } from '@make.org/types';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { updateSort } from '@make.org/store/actions/filterAndSort';
import {
  checkCurrentSort,
  SORT_ITEMS,
  getSortLabel,
  getUpdatedSortValues,
} from '../../../helper/filterAndSort';
import {
  RadioAsTransparentButtonLabelStyle,
  RadioListWrapperStyle,
  RadioItemWrapperStyle,
} from './style';

export const SortComponent: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const history = useHistory();
  const { sortAlgorithm, sort } = state.filterAndSort;
  const currentSortValues = { sortAlgorithm, sort };
  const { country, pageId } = useParams<{ country: string; pageId: string }>();
  const [currentSort, setCurrentSort] = useState<string>(SORT_RECENT);
  const question: QuestionType = selectCurrentQuestion(state);

  // handles sort values updates in state
  const handleSortChange = (name: string, value?: string) => {
    const newSortValues: TypeSortValues = getUpdatedSortValues(
      currentSortValues,
      name,
      value
    );
    dispatch(updateSort(newSortValues));
    // redirects to first page when changing filters and/or sort in pagination
    // to remove when state in url params is done
    if (pageId !== '1') {
      history.push(getExploreLink(country, question.slug));
    }
  };

  return (
    <RadioListWrapperStyle defaultValue={SORT_RECENT}>
      {SORT_ITEMS.map(
        (item: { name: string; icon: JSX.Element; value?: string }) => (
          <RadioItemWrapperStyle
            key={item.name}
            className={item.name === currentSort ? 'selected' : ''}
          >
            <ScreenReaderItemStyle>
              <input
                id={item.name}
                type="radio"
                value={item.value}
                name="sort"
                onChange={() => {
                  handleSortChange(item.name, item.value);
                  setCurrentSort(item.name);
                  trackClickSort(item.name);
                }}
                checked={checkCurrentSort(item.name, currentSort)}
              />
            </ScreenReaderItemStyle>
            <RadioAsTransparentButtonLabelStyle
              htmlFor={item.name}
              className={item.name === currentSort ? 'selected' : ''}
            >
              {item.icon}
              {getSortLabel(item.name)}
            </RadioAsTransparentButtonLabelStyle>
          </RadioItemWrapperStyle>
        )
      )}
    </RadioListWrapperStyle>
  );
};
