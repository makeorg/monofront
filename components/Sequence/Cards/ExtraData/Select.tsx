import React from 'react';
import { DemographicType } from '@make.org/types';
import { SelectStyle } from './style';

type Props = {
  data: DemographicType[];
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
