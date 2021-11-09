import React, { useState } from 'react';
import { useAppContext } from '@make.org/store';
import { useParams, useHistory } from 'react-router';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { trackClickSort } from '@make.org/utils/services/Tracking';
import { SORT_RECENT } from '@make.org/utils/constants/explore';
import { getExploreLink } from '@make.org/utils/helpers/url';
import { TypeSortValues, QuestionType } from '@make.org/types';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { updateSort } from '@make.org/store/actions/filterAndSort';
import {
  modalCloseFilters,
  modalCloseSort,
} from '@make.org/store/actions/modal';
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
  FilterBlockStyle,
  FiltersTitleStyle,
  SvgArrowsGroup,
  FiltersAndSortRedButtonStyle,
} from './style';

export const SortComponent: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const history = useHistory();
  const { sortAlgorithm, sort } = state.filterAndSort;
  const { country, device } = state.appConfig;
  const currentSortValues = { sortAlgorithm, sort };
  const { pageId } = useParams<{ pageId: string }>();
  const [currentSort, setCurrentSort] = useState<string>(SORT_RECENT);
  const question: QuestionType = selectCurrentQuestion(state);
  const isMobile = matchMobileDevice(device);
  const { showSort } = state.modal;
  const isSort = showSort === true;

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
    <FilterBlockStyle>
      <FiltersTitleStyle>
        <SvgArrowsGroup aria-hidden focusable="false" />
        {i18n.t('consultation.explore.sort_by')}
      </FiltersTitleStyle>
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
      {isMobile && (
        <FiltersAndSortRedButtonStyle
          onClick={() =>
            isSort ? dispatch(modalCloseSort()) : dispatch(modalCloseFilters())
          }
        >
          {i18n.t('consultation.explore.sort_and_close')}
        </FiltersAndSortRedButtonStyle>
      )}
    </FilterBlockStyle>
  );
};
