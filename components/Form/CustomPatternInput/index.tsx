import React, { ChangeEvent, FC, useRef } from 'react';
import { ErrorObjectType } from '@make.org/types';
import { useIsFieldValid } from '@make.org/utils/hooks/useFieldValidation';
import { throttle } from '@make.org/utils/helpers/throttle';
import {
  BasicInputStyle,
  CenterInputIconStyle,
  FieldWrapperStyle,
  FloatingLabelStyle,
  MiddleFakeFieldStyle,
} from '@make.org/ui/elements/FormElements';

type Props = {
  /** Type of the input */
  type: string;
  /** Name of the input */
  name: string;
  /** id of the input */
  id?: string;
  /** Icon of the input */
  icon: JSX.Element;
  /** Value of the input */
  value: string;
  /** Label of the input */
  label: string;
  /** Custom validation pattern */
  pattern: string;
  /** Mehtod called on change event */
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Object containing field errors */
  error?: ErrorObjectType;
  /** Is input required or optional */
  required?: boolean;
  /** Minimum length required for the input */
  minLength?: number;
  /** Maximum length required for the input */
  maxLength?: number;
};

export const CustomPatternInput: FC<Props> = ({
  type,
  name,
  id,
  icon,
  value,
  label,
  pattern,
  handleChange,
  error,
  required = false,
  minLength = 0,
  maxLength = 100000,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFieldValid = useIsFieldValid(inputRef, error);
  return (
    <MiddleFakeFieldStyle hasError={!isFieldValid} className={name}>
      <CenterInputIconStyle aria-hidden>{icon}</CenterInputIconStyle>
      <FieldWrapperStyle>
        <BasicInputStyle
          ref={inputRef}
          type={type}
          name={name}
          id={id}
          value={value}
          required={required}
          onChange={throttle(handleChange)}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          aria-invalid={!isFieldValid}
        />
        <FloatingLabelStyle htmlFor={name}>{label}</FloatingLabelStyle>
      </FieldWrapperStyle>
    </MiddleFakeFieldStyle>
  );
};
