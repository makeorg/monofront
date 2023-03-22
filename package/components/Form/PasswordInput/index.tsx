import React, { useState, useRef } from 'react';
import { ErrorObjectType } from '@make.org/types';
import { useIsFieldValid } from '@make.org/utils/hooks/useFieldValidation';
import i18n from 'i18next';
import { throttle } from '@make.org/utils/helpers/throttle';
import {
  BasicInputStyle,
  CenterInputIconStyle,
  FieldWrapperStyle,
  FloatingLabelStyle,
  MiddleFakeFieldStyle,
  PasswordRequirements,
  PasswordContainer,
} from '@make.org/ui/elements/FormElements';
import { PasswordButton } from './Button';

type Props = {
  /** Name of the input */
  name: string;
  /** Icon of the input */
  icon: JSX.Element;
  /** Type of autocomplete */
  autocomplete: string;
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
  /** display requirements */
  requirements?: boolean;
  /** USe pattern validation */
  validatePattern?: boolean;
};

export const passwordPattern =
  '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9 ])(?!.* ).{8,}$';

export const PasswordInput: React.FC<Props> = ({
  name,
  icon,
  autocomplete,
  value,
  label,
  handleChange,
  error,
  required = true,
  requirements,
  validatePattern = true,
}) => {
  const [isPasswordDisplayed, displayPassword] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFieldValid = useIsFieldValid(inputRef, error);

  return (
    <PasswordContainer>
      {requirements && (
        <PasswordRequirements>
          {i18n.t('common.form.password_requirements')}
        </PasswordRequirements>
      )}
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
            aria-invalid={!isFieldValid}
            pattern={validatePattern ? passwordPattern : undefined}
            title={i18n.t('common.form.password_requirements') || ''}
            autoComplete={autocomplete}
          />
          <FloatingLabelStyle htmlFor={name}>{label}</FloatingLabelStyle>
        </FieldWrapperStyle>
        <PasswordButton
          toggleIsPasswordDisplayed={() =>
            displayPassword(!isPasswordDisplayed)
          }
          isPasswordDisplayed={isPasswordDisplayed}
        />
      </MiddleFakeFieldStyle>
    </PasswordContainer>
  );
};
