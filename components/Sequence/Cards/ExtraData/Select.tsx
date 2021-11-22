import React, { ChangeEvent } from 'react';
import { DemographicParameterType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import { SelectStyle } from './style';

type Props = {
  data: DemographicParameterType[];
  setCurrentValue: (value: string) => void;
};

export const SelectDemographics: React.FC<Props> = ({
  data,
  setCurrentValue,
}) => {
  const { state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let { value } = event.target;
    if (value === 'null') {
      value = JSON.parse(value);
    }
    setCurrentValue(value);
  };

  return (
    <SelectStyle onChange={handleChange} className={isWidget ? 'widget' : ''}>
      <option key="null" value="null">
        {i18n.t('demographics_card.select')}
      </option>
      {data.map(demographic => (
        <option key={demographic.value} value={demographic.value}>
          {demographic.label}
        </option>
      ))}
    </SelectStyle>
  );
};
