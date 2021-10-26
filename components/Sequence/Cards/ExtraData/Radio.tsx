import React, { useState } from 'react';
import { DemographicParameterType } from '@make.org/types';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  RadioAsButtonWrapperStyle,
  RadioAsButtonLabelStyle,
  ExtraDataRadioGroupStyle,
} from './style';

type Props = {
  type: string;
  data: DemographicParameterType[];
  currentValue: string;
  setCurrentValue: (value: string) => void;
};

const handleClassName = (
  currentValue: string,
  focusValue: string | null,
  elementValue: string
): string => {
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

export const RadioDemographics: React.FC<Props> = ({
  type,
  data,
  currentValue,
  setCurrentValue,
}) => {
  const [focusValue, setFocusValue] = useState<string | null>(null);

  return (
    <ExtraDataRadioGroupStyle
      className={type === 'three-columns' ? 'three-columns' : ''}
    >
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
              name="demographic"
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
