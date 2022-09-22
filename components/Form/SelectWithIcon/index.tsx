import React, { useRef } from 'react';
import i18n from 'i18next';
import {
  BasicSelectStyle,
  CenterInputIconStyle,
  FieldWrapperStyle,
  MiddleFakeFieldStyle,
} from '@make.org/ui/elements/FormElements';

type Props = {
  /** Name of the select */
  name: string;
  /** Icon of the select */
  icon: JSX.Element;
  /** Value of the select */
  defaultValue: string;
  /** Data used in the select */
  data: any[];
  /** Mehtod called on change event */
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectWithIcon: React.FC<Props> = ({
  name,
  icon,
  defaultValue,
  data,
  handleChange,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <MiddleFakeFieldStyle>
      <CenterInputIconStyle aria-hidden>{icon}</CenterInputIconStyle>
      <FieldWrapperStyle>
        <BasicSelectStyle
          ref={selectRef}
          name={name}
          id={name}
          defaultValue={defaultValue}
          onChange={handleChange}
        >
          <option key={name} hidden>
            {i18n.t('profile.common.labels.select')}
          </option>
          {data.map(d => (
            <option key={d.isoCode} value={d.isoCode}>
              {d.name}
            </option>
          ))}
        </BasicSelectStyle>
      </FieldWrapperStyle>
    </MiddleFakeFieldStyle>
  );
};
