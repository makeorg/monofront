import React, { useRef } from 'react';
import { ErrorObjectType } from '@make.org/types';
import { useIsFieldValid } from '@make.org/utils/hooks/useFieldValidation';
import { throttle } from '@make.org/utils/helpers/throttle';
import { BasicInputStyle } from '../Styled/Input';
import { CenterInputIconStyle } from '../Styled/Icons';
import {
  MiddleFakeFieldStyle,
  FloatingLabelStyle,
  FieldWrapperStyle,
} from '../Styled/Content';

type Props = {
  /** Name of the input */
  name: string;
  /** Icon of the input */
  icon: HTMLElement;
  /** Label of the input */
  label: string;
  /** Mehtod called on change event */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Value of the input */
  value: number;
  /** Object containing field errors */
  error?: ErrorObjectType;
  /** Is input required or optional */
  required: boolean;
  /** min value */
  min: number;
  /** max value */
  max: number;
};

export const NumberInput: React.FC<Props> = ({
  name,
  icon,
  value,
  label,
  handleChange,
  error,
  required = false,
  min = 0,
  max = 100000,
}) => {
  const inputRef = useRef(null);
  const isFieldValid = useIsFieldValid(inputRef, error);
  return (
    <MiddleFakeFieldStyle hasError={!isFieldValid}>
      <CenterInputIconStyle aria-hidden>{icon}</CenterInputIconStyle>
      <FieldWrapperStyle>
        <BasicInputStyle
          ref={inputRef}
          type="number"
          name={name}
          id={name}
          value={value}
          required={required}
          onChange={throttle(handleChange)}
          min={min}
          max={max}
          aria-invalid={!isFieldValid}
        />
        <FloatingLabelStyle htmlFor={name}>{label}</FloatingLabelStyle>
      </FieldWrapperStyle>
    </MiddleFakeFieldStyle>
  );
};
