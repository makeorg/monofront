import React, { useState, FC } from 'react';
import i18n from 'i18next';
import { UserType, ErrorObjectType } from '@make.org/types';

import { PROFILE_DELETE_ACCOUNT_FORMNAME } from '@make.org/utils/constants/form';
import { PasswordInput } from '@make.org/components/Form/PasswordInput';
import { UntypedInput } from '@make.org/components/Form/UntypedInput';
import { SubmitButton } from '@make.org/components/Form/SubmitButton';
import {
  PasswordFieldIcon,
  EmailFieldIcon,
  SubmitThumbsUpIcon,
} from '@make.org/utils/constants/icons';
import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import { logout } from '@make.org/store/actions/authentication';
import { UserService } from '@make.org/utils/services/User';
import { FormErrors } from '@make.org/components/Form/Errors';
import { FormRequirementsStyle } from '@make.org/ui/elements/FormElements';
import { getFieldError } from '@make.org/utils/helpers/form';
import { ErrorMessageForgotPassword } from '@make.org/components/Form/Errors/Message/Password';
import { FormSuccessMessage } from '@make.org/components/Form/Success';
import { useAppContext } from '@make.org/store';
import { FormParagraphStyle } from '../Styled/Forms';

type Props = {
  user: UserType;
};

type TypeDeletePassword = {
  password: string;
  email: string;
};

const invalidPasswordError: ErrorObjectType = {
  field: 'password',
  key: 'invalid_password',
  message: <ErrorMessageForgotPassword />,
};

const invalidEmailError: ErrorObjectType = {
  field: 'email',
  key: 'invalid_email',
  message: i18n.t('common.form.messages.email_doesnot_exist', {
    context: 'dynamic',
    label: i18n.t('common.form.label.email'),
  }),
};

export const DeleteAccount: FC<Props> = ({ user }) => {
  const { dispatch } = useAppContext();
  const [formValues, setFormValues] = useState<TypeDeletePassword>({
    password: '',
    email: '',
  });
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const emailError = getFieldError('email', errors);
  const passwordError = getFieldError('password', errors);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });

    setCanSubmit(true);
    setIsSubmitSuccessful(false);
  };

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const success = () => {
      dispatch(logout(true));
    };
    const invalidPassword = () => {
      setCanSubmit(false);
      setErrors([invalidPasswordError]);
    };
    const invalidEmail = () => {
      setCanSubmit(false);
      setErrors([invalidEmailError]);
    };

    await UserService.deleteAccount(
      user.userId,
      formValues.password,
      success,
      invalidPassword,
      invalidEmail
    );
  };

  return (
    <TileWithTitle title={i18n.t('profile.delete_account.title')}>
      <form id={PROFILE_DELETE_ACCOUNT_FORMNAME} onSubmit={handleSubmit}>
        <FormParagraphStyle>
          {i18n.t('profile.delete_account.description')}
        </FormParagraphStyle>
        <FormRequirementsStyle>
          {i18n.t('common.form.requirements')}
        </FormRequirementsStyle>
        <FormErrors errors={errors} />
        {user.hasPassword ? (
          <PasswordInput
            label={i18n.t('profile.delete_account.password')}
            name="password"
            id="password"
            required
            icon={PasswordFieldIcon}
            value={formValues.password}
            error={passwordError}
            handleChange={handleChange}
          />
        ) : (
          <UntypedInput
            type="email"
            name="email"
            value={formValues.email}
            icon={EmailFieldIcon}
            label={i18n.t('common.form.label.email')}
            error={emailError}
            required
            handleChange={handleChange}
          />
        )}
        <SubmitButton
          disabled={!canSubmit}
          formName={PROFILE_DELETE_ACCOUNT_FORMNAME}
          icon={SubmitThumbsUpIcon}
          label={i18n.t('profile.delete_account.submit_label')}
        />
        {isSubmitSuccessful && <FormSuccessMessage />}
      </form>
    </TileWithTitle>
  );
};
