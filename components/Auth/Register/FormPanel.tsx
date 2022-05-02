import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { ErrorObjectType, RegisterFormDataType } from '@make.org/types';
import { FormLeftAlignStyle } from '@make.org/ui/elements/FormElements';
import { getFieldError } from '@make.org/utils/helpers/form';
import { FORM } from '@make.org/types/enums';
import { throttle } from '@make.org/utils/helpers/throttle';
import { trackDisplaySignupForm } from '@make.org/utils/services/Tracking';
import { TitleForm } from './Title';
import { FirstStepRegister } from './FirstStep';
import { SecondStepRegister } from './SecondStep';

type Props = {
  user: RegisterFormDataType;
  errors: ErrorObjectType[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (fieldName: string, value: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  checkRegistration: () => void;
  disableSubmit: boolean;
  registerPanelStep: number;
};
/**
 * Renders Register Form
 */
export const RegisterFormPanel: React.FC<Props> = ({
  user,
  errors,
  handleChange,
  handleCheckbox,
  handleSubmit,
  checkRegistration,
  disableSubmit,
  registerPanelStep,
}) => {
  const emailError = getFieldError('email', errors);
  const passwordError = getFieldError('password', errors);
  const firstnameError = getFieldError('firstname', errors);
  const ageError = getFieldError('dateofbirth', errors);
  const postalcodeError = getFieldError('postalcode', errors);

  useEffect(() => {
    trackDisplaySignupForm(`${registerPanelStep}`);
  }, [registerPanelStep]);

  return (
    <FormLeftAlignStyle
      id={FORM.REGISTER_PANEL_FORMNAME}
      onSubmit={throttle(handleSubmit)}
    >
      <TitleForm errors={errors} registerPanelStep={registerPanelStep} />
      {registerPanelStep === 1 && (
        <FirstStepRegister
          user={user}
          emailError={emailError}
          passwordError={passwordError}
          handleChange={handleChange}
          checkRegistration={checkRegistration}
        />
      )}
      {registerPanelStep === 2 && (
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
