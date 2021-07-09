import React, { useState, useRef } from 'react';
import { ErrorObjectType } from '@make.org/types';
import { useIsFieldValid } from '@make.org/utils/hooks/useFieldValidation';
import { throttle } from '@make.org/utils/helpers/throttle';
import { BasicInputStyle } from '../Styled/Input';
import { CenterInputIconStyle } from '../Styled/Icons';
import { PasswordButton } from './Button';
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
  /** Value of the input */
  value: string;
  /** Label of the input */
  label: string;
  /** Mehtod called on change event */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Object containing field errors */
  error?: ErrorObjectType;
  /** Is input required or optional */
  required: boolean;
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
  const inputRef = useRef(null);
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
