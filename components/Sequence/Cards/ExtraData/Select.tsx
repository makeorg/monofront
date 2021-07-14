import React from 'react';
import { DemographicDataType } from '@make.org/types';
import { SelectStyle } from './style';

type Props = {
  data: DemographicDataType[];
  setCurrentValue: (value: string) => void;
};

export const SelectDemographics: React.FC<Props> = ({
  data,
  setCurrentValue,
}) => (
  <SelectStyle onChange={event => setCurrentValue(event.target.value)}>
    {data.map(demographic => (
      <option key={demographic.value} value={demographic.value}>
        {demographic.label}
      </option>
    ))}
  </SelectStyle>
);
