import React, { useState } from 'react';
import i18n from 'i18next';
import { UserService } from '@make.org/utils/services/User';
import { useAppContext } from '@make.org/store';
import { ErrorObjectType } from '@make.org/types';
import { getFieldError } from '@make.org/utils/helpers/form';
import { FORM } from '@make.org/types/enums';
import { setPanelContent } from '@make.org/store/actions/panel';
import {
  EmailFieldIcon,
  SubmitPaperPlaneIcon,
} from '@make.org/utils/constants/icons';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import { UntypedInput } from '../../Form/UntypedInput';
import { SubmitButton } from '../../Form/SubmitButton';
import { FormErrors } from '../../Form/Errors';
import { ForgotPasswordFormStyle, ForgotPasswordTitleStyle } from './style';

/**
 * Renders ForgotPassword Form
 */

export const ForgotPasswordForm: React.FC = () => {
  const { dispatch } = useAppContext();
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
      <>
        <ForgotPasswordTitleStyle>
          {i18n.t('forgot_password.success')}
        </ForgotPasswordTitleStyle>
        <RedButtonStyle
          onClick={() => dispatch(setPanelContent(PANEL_CONTENT.LOGIN))}
        >
          {i18n.t('proposal_submit.authentication.back_authentication')}
        </RedButtonStyle>
      </>
    );
  }

  return (
    <ForgotPasswordFormStyle
      id={FORM.FORGOT_PASSWORD_FORMNAME}
      onSubmit={handleSubmit}
    >
      <ForgotPasswordTitleStyle>
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
