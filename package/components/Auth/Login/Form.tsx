import React, { FC, useEffect, useState } from 'react';
import { ErrorObjectType } from '@make.org/types';
import i18n from 'i18next';
import { UserService } from '@make.org/utils/services/User';
import {
  trackDisplaySigninForm,
  trackLoginEmailSuccess,
  trackSignupEmailFailure,
} from '@make.org/utils/services/Tracking';
import { LinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { FORM, NOTIF } from '@make.org/types/enums';
import { SubmitThumbsUpIcon } from '@make.org/utils/constants/icons';
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
  FormRightAlignStyle,
  FormRequirementsLeftStyle,
} from '@make.org/ui/elements/FormElements';
import { ProposalService } from '@make.org/utils/services/Proposal';
import {
  setPanelContent,
  closePanel,
  removePanelContent,
} from '@make.org/store/actions/panel';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import { FormErrors } from '../../Form/Errors';
import { SubmitButton } from '../../Form/SubmitButton';
import { EmailPasswordFields } from '../../Form/EmailPassword';

type TypeLoginValues = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  const { dispatch, state } = useAppContext();
  const { privacyPolicy, country } = state.appConfig;
  const { pendingProposal, isAnonymous } = state.pendingProposal;
  const question = selectCurrentQuestion(state);
  const defaultFormValues = {
    email: '',
    password: '',
  };
  const [formValues, setFormValues] =
    useState<TypeLoginValues>(defaultFormValues);
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const emailError = getFieldError('email', errors);
  const passwordError = getFieldError('password', errors);

  /** Method called to load user after login */
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

    const success = async () => {
      dispatch(loginSuccess());
      trackLoginEmailSuccess();
      setErrors([]);
      getUser(dispatch, state.modal.isOpen);
      dispatch(
        displayNotificationBanner(
          NOTIF.LOGIN_SUCCESS_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_SUCCESS
        )
      );

      if (!pendingProposal) {
        dispatch(
          displayNotificationBanner(
            NOTIF.LOGIN_SUCCESS_MESSAGE,
            NOTIF.NOTIFICATION_LEVEL_SUCCESS
          )
        );
        dispatch(closePanel());
        dispatch(removePanelContent());
        return;
      }

      await ProposalService.propose(
        pendingProposal,
        question.questionId,
        question.returnedLanguage,
        country,
        isAnonymous,
        () => dispatch(setPanelContent(PANEL_CONTENT.PROPOSAL_SUCCESS))
      );
    };
    const handleErrors = (serviceErrors?: ErrorObjectType[]) => {
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
      () => success(),
      serviceErrors => handleErrors(serviceErrors),
      () => unexpectedError()
    );
  };

  useEffect(() => {
    trackDisplaySigninForm();
  }, []);

  return (
    <FormRightAlignStyle
      id={FORM.LOGIN_FORMNAME}
      onSubmit={throttle(handleSubmit)}
      data-cy-container="login-form"
    >
      <FormRequirementsLeftStyle>
        {i18n.t('common.form.requirements_short')}
      </FormRequirementsLeftStyle>
      <FormErrors errors={errors} />
      <EmailPasswordFields
        emailValue={formValues.email}
        passwordValue={formValues.password}
        emailError={emailError}
        passwordError={passwordError}
        handleChange={handleChange}
        validatePattern={false}
      />
      <LinkButtonStyle
        onClick={() => dispatch(setPanelContent(PANEL_CONTENT.PASSWORD_FORGOT))}
        type="button"
      >
        {i18n.t('login.forgot_password')}
      </LinkButtonStyle>
      <SubmitButton
        formName={FORM.LOGIN_FORMNAME}
        icon={SubmitThumbsUpIcon}
        id="authentication-login-submit"
        label={i18n.t('common.connexion_label')}
        disabled={!formValues.email || !formValues.password}
        data-cy-button="login"
      />
    </FormRightAlignStyle>
  );
};
