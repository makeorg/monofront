import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { ErrorObjectType, RegisterFormDataType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { FormLeftAlignStyle } from '@make.org/ui/elements/FormElements';
import { getFieldError } from '@make.org/utils/helpers/form';
import { FORM } from '@make.org/types/enums';
import { throttle } from '@make.org/utils/helpers/throttle';
import { trackDisplaySignupForm } from '@make.org/utils/services/Tracking';
import { TitleForm } from './Title';
import { FirstStepRegister } from '../Steps/FirstStep';
import { SecondStepRegister } from '../Steps/SecondStep';
import { SocialAuthenticationButtons } from '../AuthenticationButtons/SocialAuthenticationButtons';

type Props = {
  user: RegisterFormDataType;
  errors: ErrorObjectType[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (fieldName: string, value: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  checkRegistration: () => void;
  disableSubmit: boolean;
  registerStep: number;
};
/**
 * Renders Register Form
 */
export const RegisterForm: React.FC<Props> = ({
  user,
  errors,
  handleChange,
  handleCheckbox,
  handleSubmit,
  checkRegistration,
  disableSubmit,
  registerStep,
}) => {
  const emailError = getFieldError('email', errors);
  const passwordError = getFieldError('password', errors);
  const firstnameError = getFieldError('firstname', errors);
  const ageError = getFieldError('dateofbirth', errors);
  const postalcodeError = getFieldError('postalcode', errors);
  const { state } = useAppContext();
  const { pendingProposal } = state.pendingProposal;

  useEffect(() => {
    trackDisplaySignupForm(`${registerStep}`);
  }, [registerStep]);

  return (
    <FormLeftAlignStyle
      id={FORM.REGISTER_PANEL_FORMNAME}
      onSubmit={throttle(handleSubmit)}
      data-cy-container="register-form"
    >
      <TitleForm errors={errors} registerStep={registerStep} />
      {registerStep === 1 && (
        <>
          <FirstStepRegister
            user={user}
            emailError={emailError}
            passwordError={passwordError}
            handleChange={handleChange}
            checkRegistration={checkRegistration}
          />
          {!pendingProposal && <SocialAuthenticationButtons />}
        </>
      )}
      {registerStep === 2 && (
        <SecondStepRegister
          user={user}
          firstnameError={firstnameError}
          ageError={ageError}
          postalcodeError={postalcodeError}
          handleChange={handleChange}
          handleCheckbox={handleCheckbox}
          disableSubmit={disableSubmit}
        />
      )}
    </FormLeftAlignStyle>
  );
};
