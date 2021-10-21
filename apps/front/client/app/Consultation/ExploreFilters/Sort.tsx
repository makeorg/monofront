import React from 'react';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { trackClickSort } from '@make.org/utils/services/Tracking';
import { SORT_ITEMS, getSortLabel } from '../../../helper/filterAndSort';
import {
  RadioAsTransparentButtonLabelStyle,
  RadioListWrapperStyle,
  RadioItemWrapperStyle,
} from './style';

type Props = {
  handleClassName(
    currentValue: string | undefined,
    elementValue: string
  ): string;
  handleChange: (name: string, value?: string) => void;
  currentSort: string;
  setCurrentSort: (name: string) => void;
};

const checkCurrentSort = (itemName: string, currentSort: string): boolean => {
  if (itemName === currentSort) {
    return true;
  }
  return false;
};

export const SortComponent: React.FC<Props> = ({
  handleClassName,
  handleChange,
  currentSort,
  setCurrentSort,
}: Props) => (
  <RadioListWrapperStyle>
    {SORT_ITEMS.map(
      (item: { name: string; icon: JSX.Element; value?: string }) => (
        <RadioItemWrapperStyle
          key={item.name}
          className={handleClassName(currentSort, item.name)}
        >
          <ScreenReaderItemStyle>
            <input
              id={item.name}
              type="radio"
              value={item.value}
              name="sort"
              onChange={() => {
                handleChange(item.name, item.value);
                setCurrentSort(item.name);
                trackClickSort(item.name);
              }}
              checked={checkCurrentSort(item.name, currentSort)}
            />
          </ScreenReaderItemStyle>
          <RadioAsTransparentButtonLabelStyle
            htmlFor={item.name}
            className={handleClassName(currentSort, item.name)}
          >
            {item.icon}
            {getSortLabel(item.name)}
          </RadioAsTransparentButtonLabelStyle>
        </RadioItemWrapperStyle>
      )
    )}
  </RadioListWrapperStyle>
);
