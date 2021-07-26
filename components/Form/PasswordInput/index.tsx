import React, { useState, useRef } from 'react';
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
import { PasswordButton } from './Button';

type Props = {
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

export const PasswordInput: React.FC<Props> = ({
  name,
  icon,
  value,
  label,
  handleChange,
  error,
  required = true,
}) => {
  const [isPasswordDisplayed, displayPassword] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFieldValid = useIsFieldValid(inputRef, error);

  return (
    <MiddleFakeFieldStyle hasError={!isFieldValid}>
      <CenterInputIconStyle>{icon}</CenterInputIconStyle>
      <FieldWrapperStyle>
        <BasicInputStyle
          ref={inputRef}
          type={isPasswordDisplayed ? 'text' : 'password'}
          name={name}
          id={name}
          value={value}
          required={required}
          onChange={throttle(handleChange)}
          minLength={8}
          aria-invalid={!isFieldValid}
        />
        <FloatingLabelStyle htmlFor={name}>{label}</FloatingLabelStyle>
      </FieldWrapperStyle>
      <PasswordButton
        toggleIsPasswordDisplayed={() => displayPassword(!isPasswordDisplayed)}
        isPasswordDisplayed={isPasswordDisplayed}
      />
    </MiddleFakeFieldStyle>
  );
};
