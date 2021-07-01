// @flow
import { type DemographicsType } from 'Shared/types/card';
import { ScreenReaderItemStyle } from 'Client/ui/Elements/AccessibilityElements';
import React, { useState } from 'react';
import {
  RadioAsButtonWrapperStyle,
  RadioAsButtonLabelStyle,
  ExtraDataRadioGroupStyle,
} from './style';

type Props = {
  type: string,
  data: DemographicsType[],
  currentValue: string,
  setCurrentValue: () => {},
};

const handleClassName = (
  currentValue: string,
  focusValue: string,
  elementValue: string
) => {
  if (elementValue === currentValue && elementValue === focusValue) {
    return 'selected focused';
  }

  if (elementValue === currentValue) {
    return 'selected';
  }

  if (elementValue === focusValue) {
    return 'focused';
  }

  return '';
};

export const RadioDemographics = ({
  type,
  data,
  currentValue,
  setCurrentValue,
}: Props) => {
  const [focusValue, setFocusValue] = useState(null);
  const isAgeDemographic = type === 'age';

  return (
    <ExtraDataRadioGroupStyle className={isAgeDemographic && 'three-columns'}>
      {data.map(demographic => (
        <RadioAsButtonWrapperStyle
          key={demographic.value}
          className={handleClassName(
            currentValue,
            focusValue,
            demographic.value
          )}
        >
          <ScreenReaderItemStyle>
            <input
              id={demographic.value}
              type="radio"
              value={demographic.value}
              name={type}
              onChange={() => setCurrentValue(demographic.value)}
              onFocus={() => setFocusValue(demographic.value)}
              onBlur={() => setFocusValue(null)}
            />
          </ScreenReaderItemStyle>
          <RadioAsButtonLabelStyle htmlFor={demographic.value}>
            {demographic.label}
          </RadioAsButtonLabelStyle>
        </RadioAsButtonWrapperStyle>
      ))}
    </ExtraDataRadioGroupStyle>
  );
};
