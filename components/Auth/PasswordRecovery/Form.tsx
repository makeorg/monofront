import React, { useState } from 'react';
import { ErrorObjectType } from '@make.org/types';
import { i18n } from '@make.org/utils/i18n';
import { PasswordInput } from '@make.org/components/Form/PasswordInput';
import { SubmitButton } from '@make.org/ui/components/SubmitButton';
import { PASSWORD_RECOVERY_FORMNAME } from '@make.org/utils/constants/form';
import { FormRequirementsStyle } from '@make.org/ui/elements/FormElements';
import {
  PasswordFieldIcon,
  SubmitPaperPlaneIcon,
} from '@make.org/utils/constants/icons';
import { passwordRecovery } from '@make.org/store/actions/user/passwordRecovery';
import { throttle } from '@make.org/utils/helpers/throttle';
import { selectPasswordRecovery } from '@make.org/store/selectors/user.selector';
import { FormErrors } from '@make.org/components/Form/Errors';
import { getFieldError } from '@make.org/utils/helpers/form';
import { useAppContext } from '@make.org/store';
import { PasswordRecoveryFormStyle } from './style';

/**
 * Renders ForgotPassword Form
 */
export const PasswordRecoveryForm: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { error, errorMessage } = selectPasswordRecovery(state);
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const passwordError = getFieldError('password', errors);

  if (error) {
    setErrors([
      {
        field: 'password',
        key: 'password_message',
        message: <span>{errorMessage}</span>,
      },
    ]);
  }

  const handleSubmitForm = (newPassword: string) => {
    dispatch(passwordRecovery(newPassword));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (password) {
      handleSubmitForm(password);
    }

    if (!error) {
      setErrors([]);
    }
  };

  return (
    <PasswordRecoveryFormStyle
      id={PASSWORD_RECOVERY_FORMNAME}
      onSubmit={throttle(handleSubmit)}
    >
      <FormRequirementsStyle>
        {i18n.t('common.form.requirements')}
      </FormRequirementsStyle>
      <FormErrors errors={errors} />
      <PasswordInput
        name="password"
        icon={PasswordFieldIcon}
        value={password}
        label={i18n.t('common.form.label.password')}
        handleChange={handleChange}
        error={passwordError}
      />
      <SubmitButton
        formName={PASSWORD_RECOVERY_FORMNAME}
        icon={SubmitPaperPlaneIcon}
        label={i18n.t('reset_password.send_cta')}
      />
    </PasswordRecoveryFormStyle>
  );
};
