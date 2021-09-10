import React, { useState } from 'react';
import i18n from 'i18next';
import { UserService } from '@make.org/utils/services/User';
import { ErrorObjectType } from '@make.org/types';
import { getFieldError } from '@make.org/utils/helpers/form';
import { FORM } from '@make.org/types/enums';
import {
  EmailFieldIcon,
  SubmitPaperPlaneIcon,
} from '@make.org/utils/constants/icons';
import { UntypedInput } from '../../Form/UntypedInput';
import { SubmitButton } from '../../Form/SubmitButton';
import { FormErrors } from '../../Form/Errors';
import { ForgotPasswordFormStyle, ForgotPasswordTitleStyle } from './style';

/**
 * Renders ForgotPassword Form
 */
type Props = {
  isPanel?: boolean;
};

export const ForgotPasswordForm: React.FC<Props> = ({ isPanel }) => {
  const [email, setEmail] = useState<string>('');
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const emailError = getFieldError('email', errors);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = () => setSuccess(true);
    const handleErrors = (serviceErrors: ErrorObjectType[]) => {
      setErrors(serviceErrors);
    };
    await UserService.forgotPassword(
      email.trim(),
      () => success(),
      serviceErrors => handleErrors(serviceErrors)
    );
  };

  if (isSuccess) {
    return (
      <ForgotPasswordTitleStyle>
        {i18n.t('forgot_password.success')}
      </ForgotPasswordTitleStyle>
    );
  }

  return (
    <ForgotPasswordFormStyle
      id={FORM.FORGOT_PASSWORD_FORMNAME}
      onSubmit={handleSubmit}
    >
      <ForgotPasswordTitleStyle isPanel={isPanel}>
        {i18n.t('forgot_password.description')}
      </ForgotPasswordTitleStyle>
      <FormErrors errors={errors} />
      <UntypedInput
        type="email"
        name="email"
        id="email"
        icon={EmailFieldIcon}
        value={email}
        label={i18n.t('common.form.label.email')}
        required
        handleChange={handleChange}
        error={emailError}
      />
      <SubmitButton
        formName={FORM.FORGOT_PASSWORD_FORMNAME}
        icon={SubmitPaperPlaneIcon}
        label={i18n.t('forgot_password.send_link')}
      />
    </ForgotPasswordFormStyle>
  );
};
