import React, { useState } from 'react';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { trackClickSort } from '@make.org/utils/services/Tracking';
import { SORT_RECENT } from '@make.org/utils/constants/explore';
import { SORT_ITEMS, getSortLabel } from '../../../helper/filterAndSort';
import {
  RadioAsTransparentButtonLabelStyle,
  RadioListWrapperStyle,
  RadioItemWrapperStyle,
} from './style';

type Props = {
  handleChange: (name: string, value?: string) => void;
};

const checkCurrentSort = (itemName: string, currentSort: string): boolean => {
  if (itemName === currentSort) {
    return true;
  }
  return false;
};

export const SortComponent: React.FC<Props> = ({ handleChange }: Props) => {
  const [currentSort, setCurrentSort] = useState<string>(SORT_RECENT);
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
                  handleChange(item.name, item.value);
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
