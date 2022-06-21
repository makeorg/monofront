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
import { FORM, NOTIF, AUTH_STEP } from '@make.org/types/enums';
import { SubmitThumbsUpIcon } from '@make.org/utils/constants/icons';
import { throttle } from '@make.org/utils/helpers/throttle';
import { getFieldError } from '@make.org/utils/helpers/form';
import { loginSuccess, getUser } from '@make.org/store/actions/authentication';
import {
  modalClose,
  modalShowDataPolicyLogin,
} from '@make.org/store/actions/modal';
import { setProposalAuthStep } from '@make.org/store/actions/pendingProposal';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { useAppContext } from '@make.org/store';
import {
  FormRightAlignStyle,
  FormRequirementsLeftStyle,
} from '@make.org/ui/elements/FormElements';
import { ProposalSuccess } from '@make.org/components/Proposal/Submit/Success';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { setPanelContent } from '@make.org/store/actions/panel';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { FormErrors } from '../../Form/Errors';
import { SubmitButton } from '../../Form/SubmitButton';
import { EmailPasswordFields } from '../CommonFields/EmailPassword';

type TypeLoginValues = {
  email: string;
  password: string;
};

type Props = {
  isProposalSubmit?: boolean;
};

export const LoginForm: FC<Props> = ({ isProposalSubmit }) => {
  const { dispatch, state } = useAppContext();
  const { privacyPolicy } = state.appConfig;
  const { proposalContent } = state.pendingProposal;
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

      if (!proposalContent) {
        dispatch(
          displayNotificationBanner(
            NOTIF.LOGIN_SUCCESS_MESSAGE,
            NOTIF.NOTIFICATION_LEVEL_SUCCESS
          )
        );
        return;
      }
      await ProposalService.propose(proposalContent, question.questionId, () =>
        dispatch(setPanelContent(<ProposalSuccess />))
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
      />
      {isProposalSubmit && (
        <LinkButtonStyle
          onClick={() =>
            dispatch(setProposalAuthStep(AUTH_STEP.FORGOT_PASSWORD))
          }
          type="button"
        >
          {i18n.t('login.forgot_password')}
        </LinkButtonStyle>
      )}
      <SubmitButton
        formName={FORM.LOGIN_FORMNAME}
        icon={SubmitThumbsUpIcon}
        id="authentication-login-submit"
        label={i18n.t('common.connexion_label')}
      />
    </FormRightAlignStyle>
  );
};
