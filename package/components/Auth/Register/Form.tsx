import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import {
  ErrorObjectType,
  ILogger,
  RegisterFormDataType,
} from '@make.org/types';
import { useAppContext } from '@make.org/store';
import {
  FormLeftAlignHeightStyle,
  FormRequirementsStyle,
} from '@make.org/ui/elements/FormElements';
import { getFieldError } from '@make.org/utils/helpers/form';
import { FORM } from '@make.org/types/enums';
import { throttle } from '@make.org/utils/helpers/throttle';
import { trackDisplaySignupForm } from '@make.org/utils/services/Tracking';
import i18n from 'i18next';
import { FirstStepRegister } from '@make.org/components/Auth/Register/Steps/FirstStep';
import { SecondStepRegister } from '@make.org/components/Auth/Register/Steps/SecondStep';
import { SocialAuthenticationButtons } from '@make.org/components/Auth/Social/SocialAuthenticationButtons';
import { RegisterEmailTitleStyle } from '@make.org/components/Auth/style';
import { FormErrors } from '@make.org/components/Form/Errors';

type Props = {
  user: RegisterFormDataType;
  errors: ErrorObjectType[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (fieldName: string, value: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  disableSubmit: boolean;
  registerStep: number;
  logger: ILogger;
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
  disableSubmit,
  registerStep,
  logger,
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
    <FormLeftAlignHeightStyle
      id={FORM.REGISTER_PANEL_FORMNAME}
      onSubmit={throttle(handleSubmit)}
      data-cy-container="register-form"
    >
      <RegisterEmailTitleStyle data-cy-container="register-panel-title">
        {i18n.t('common.social_login.email_register')}{' '}
        {i18n.t('common.social_login.count_register', {
          count: registerStep,
        })}
      </RegisterEmailTitleStyle>
      <FormRequirementsStyle>
        {registerStep === 1
          ? i18n.t('common.form.requirements_short')
          : i18n.t('common.form.requirements')}
      </FormRequirementsStyle>
      <FormErrors errors={errors} />
      {registerStep === 1 && (
        <>
          <FirstStepRegister
            user={user}
            emailError={emailError}
            passwordError={passwordError}
            handleChange={handleChange}
          />
          {!pendingProposal && <SocialAuthenticationButtons logger={logger} />}
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
    </FormLeftAlignHeightStyle>
  );
};
