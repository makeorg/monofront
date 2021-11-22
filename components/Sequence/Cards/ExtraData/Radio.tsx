import React, { useState } from 'react';
import { useAppContext } from '@make.org/store';
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
  const { state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  const [focusValue, setFocusValue] = useState<string | null>(null);

  let className = '';

  if (isWidget && type === 'three-columns') {
    className = 'widget three-columns';
  }

  if (isWidget && type === 'one-column') {
    className = 'widget';
  }

  if (!isWidget && type === 'three-columns') {
    className = 'three-columns';
  }

  return (
    <ExtraDataRadioGroupStyle className={className}>
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
          <RadioAsButtonLabelStyle
            htmlFor={demographic.value}
            className={className}
          >
            {demographic.label}
          </RadioAsButtonLabelStyle>
        </RadioAsButtonWrapperStyle>
      ))}
    </ExtraDataRadioGroupStyle>
  );
};
