import React, { useRef } from 'react';
import { ErrorObjectType } from '@make.org/types';
import { useIsFieldValid } from '@make.org/utils/hooks/useFieldValidation';
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
  /** Icon of the input */
  icon: JSX.Element;
  /** Value of the input */
  value: string;
  /** Label of the input */
  label: string;
  /** Mehtod called on change event */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Object containing field errors */
  error?: ErrorObjectType;
  /** Is input required or optional */
  required?: boolean;
};

export const UntypedInput: React.FC<Props> = ({
  type,
  name,
  icon,
  value,
  label,
  handleChange,
  error,
  required = false,
}) => {
   const inputRef = useRef<HTMLInputElement>(null);  const isFieldValid = useIsFieldValid(inputRef, error);

  return (
    <MiddleFakeFieldStyle hasError={!isFieldValid}>
      <CenterInputIconStyle aria-hidden>{icon}</CenterInputIconStyle>
      <FieldWrapperStyle>
        <BasicInputStyle
          ref={inputRef}
          type={type}
          name={name}
          id={name}
          value={value}
          required={required}
          onChange={handleChange}
          aria-invalid={!isFieldValid}
        />
        <FloatingLabelStyle htmlFor={name}>{label}</FloatingLabelStyle>
      </FieldWrapperStyle>
    </MiddleFakeFieldStyle>
  );
};
