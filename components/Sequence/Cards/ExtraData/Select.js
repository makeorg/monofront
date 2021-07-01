// @flow
import React from 'react';
import { SelectStyle } from './style';

export const SelectDemographics = ({ data, setCurrentValue }) => (
  <SelectStyle onChange={event => setCurrentValue(event.target.value)}>
    {data.map(demographic => (
      <option key={demographic.value} value={demographic.value}>
        {demographic.label}
      </option>
    ))}
  </SelectStyle>
);
