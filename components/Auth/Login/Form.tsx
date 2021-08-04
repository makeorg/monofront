import React, { useState } from 'react';
import { ErrorObjectType } from '@make.org/types';
import i18n from 'i18next';
import { UserService } from '@make.org/utils/services/User';
import {
  trackLoginEmailSuccess,
  trackSignupEmailFailure,
} from '@make.org/utils/services/Tracking';

import { FORM, NOTIF } from '@make.org/types/enums';
import {
  EmailFieldIcon,
  PasswordFieldIcon,
  SubmitThumbsUpIcon,
} from '@make.org/utils/constants/icons';
import { throttle } from '@make.org/utils/helpers/throttle';
import { getFieldError } from '@make.org/utils/helpers/form';
import { loginSuccess, getUser } from '@make.org/store/actions/authentication';

import {
  modalClose,
  modalShowDataPolicyLogin,
} from '@make.org/store/actions/modal';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { useAppContext } from '@make.org/store';
import {
  FormCenterAlignStyle,
  FormRequirementsStyle,
} from '@make.org/ui/elements/FormElements';
import { FormErrors } from '../../Form/Errors';
import { SubmitButton } from '../../Form/SubmitButton';
import { PasswordInput } from '../../Form/PasswordInput';
import { UntypedInput } from '../../Form/UntypedInput';

type TypeLoginValues = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { privacyPolicy } = state.appConfig;
  const defaultFormValues = {
    email: '',
    password: '',
  };
  const [formValues, setFormValues] =
    useState<TypeLoginValues>(defaultFormValues);
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const emailError = getFieldError('email', errors);
  const passwordError = getFieldError('password', errors);

  /** Method called when login form succeed */
  const handleLoginSuccess = () => {
    dispatch(loginSuccess());
  };

  /** Method called to load user after login */
  const handleGetUser = () => {
    dispatch(getUser());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const success = () => {
      handleLoginSuccess();
      trackLoginEmailSuccess();
      setErrors([]);
      handleGetUser();
      dispatch(
        displayNotificationBanner(
          NOTIF.LOGIN_SUCCESS_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_SUCCESS
        )
      );
    };
    const handleErrors = (serviceErrors: ErrorObjectType[] | undefined) => {
      if (serviceErrors) {
        setErrors(serviceErrors);
      }
      trackSignupEmailFailure();
    };
    const unexpectedError = () => dispatch(modalClose());
    await UserService.checkLoginPrivacyPolicy(
      formValues.email,
      formValues.password,
      privacyPolicy,
      () =>
        dispatch(
          modalShowDataPolicyLogin(formValues.email, formValues.password)
        ),
      success,
      handleErrors,
      unexpectedError
    );
  };

  return (
    <FormCenterAlignStyle
      id={FORM.LOGIN_FORMNAME}
      onSubmit={throttle(handleSubmit)}
    >
      <FormRequirementsStyle>
        {i18n.t('common.form.requirements')}
      </FormRequirementsStyle>
      <FormErrors errors={errors} />
      <UntypedInput
        type="email"
        name="email"
        icon={EmailFieldIcon}
        value={formValues.email}
        label={i18n.t('common.form.label.email')}
        required
        error={emailError}
        handleChange={handleChange}
      />
      <PasswordInput
        name="password"
        icon={PasswordFieldIcon}
        value={formValues.password}
        label={i18n.t('common.form.label.password')}
        required
        error={passwordError}
        handleChange={handleChange}
      />
      <SubmitButton
        formName={FORM.LOGIN_FORMNAME}
        icon={SubmitThumbsUpIcon}
        id="authentication-login-submit"
        label={i18n.t('common.connexion_label')}
      />
    </FormCenterAlignStyle>
  );
};
