import React, { FormEvent, SyntheticEvent, useState } from 'react';
import i18n from 'i18next';
import {
  RegisterFormDataType,
  ErrorObjectType,
  ILogger,
} from '@make.org/types';
import { closePanel, setPanelContent } from '@make.org/store/actions/panel/';
import {
  trackSignupEmailSuccess,
  trackSignupEmailFailure,
} from '@make.org/utils/services/Tracking';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import { UserService } from '@make.org/utils/services/User';
import { useAppContext } from '@make.org/store';
import { getUser } from '@make.org/store/actions/authentication';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { NewWindowGreyIconStyle } from '@make.org/ui/elements/LinkElements';
import { setRegisterStep } from '@make.org/store/actions/pendingProposal';
import { LegalConsent } from '@make.org/components/Form/LegalConsent';
import { ProposalBackButtonStyle } from '@make.org/components/Proposal/Submit/style';
import { ProposalAuthentication } from '@make.org/components/Proposal/Submit/Authentication';
import {
  AuthenticationWrapperStyle,
  GreyParagraphStyle,
  PersonalDataGreyLinkStyle,
  RegisterFormUtilsAlignementWrapperStyle,
} from '@make.org/components/Auth/style';
import { RegisterForm } from '@make.org/components/Auth/Register/Form';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';

type Props = {
  logger: ILogger;
};

export const Register: React.FC<Props> = ({ logger }) => {
  const { dispatch, state } = useAppContext();
  const { pendingProposal, registerStep, isAnonymous } = state.pendingProposal;
  const { country, language } = state.appConfig;
  const [user, setUser] = useState<RegisterFormDataType>({
    email: '',
    password: '',
    profile: {
      firstname: '',
      age: '',
      postalcode: '',
      legalMinorConsent: false,
      legalAdvisorApproval: false,
      approvePrivacyPolicy: false,
      optInNewsletter: false,
    },
  });
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const [waitingCallback, setWaitingCallback] = useState<boolean>(false);
  const [needLegalConsent, displayLegalConsent] = useState<boolean>(false);
  const question = selectCurrentQuestion(state);
  const age: undefined | number =
    typeof user?.profile?.age === 'number'
      ? user?.profile?.age
      : parseInt(user?.profile?.age, 10) || undefined;
  const userIsAChild = age && age < 16;
  const isSecondStep = registerStep === 2;

  const handleReturn = () => {
    if (isSecondStep) {
      dispatch(setRegisterStep(1));
      return;
    }
    if (pendingProposal) {
      dispatch(setPanelContent(<ProposalAuthentication logger={logger} />));
      return;
    }
    dispatch(setPanelContent(PANEL_CONTENT.LOGIN));
  };

  const handleCheckbox = (fieldName: string, value: boolean) => {
    if (!fieldName || value === undefined) {
      logger.logError({
        message:
          'handleCheckbox in register form : fieldname or value is missing',
        name: 'register',
      });
      return null;
    }
    return setUser({
      ...user,
      profile: {
        ...user.profile,
        [fieldName]: value,
      },
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id.includes('profile.')) {
      const [, name] = id.split('.');
      setUser({
        ...user,
        profile: {
          ...user.profile,
          [name]: value,
        },
      });

      return;
    }

    setUser({
      ...user,
      [id]: value,
    });
  };

  const logAndLoadUser = async (email: string, password: string) => {
    const unexpectedError = () => {
      dispatch(closePanel());
      // @toDo: notify user
      logger.logError({
        message: `Login fail for ${email}`,
        name: 'register',
      });
    };

    return UserService.login(
      email,
      password,
      undefined,
      () => getUser(dispatch, state.modal.isOpen),
      () => undefined,
      () => unexpectedError()
    );
  };

  const handleStep1Submit = () => {
    const success = () => {
      dispatch(setRegisterStep(2));
      setErrors([]);
    };
    const handleErrors = (serviceErrors: ErrorObjectType[]) => {
      setErrors(serviceErrors);
    };
    const unexpectedError = () => dispatch(closePanel());

    UserService.checkRegistration(
      user.email,
      user.password,
      success,
      handleErrors,
      unexpectedError,
      logger
    );
  };

  const handleStep2Submit = async () => {
    const success = () => {
      logAndLoadUser(user.email, user.password).then(async () => {
        trackSignupEmailSuccess();
        setErrors([]);
        if (!pendingProposal) {
          dispatch(setPanelContent(PANEL_CONTENT.REGISTER_CONFIRMATION));
        }

        // Display the proposal in the proposal submit context
        if (pendingProposal) {
          await ProposalService.propose(
            pendingProposal,
            question.questionId,
            question.returnedLanguage,
            country,
            isAnonymous,
            () =>
              dispatch(setPanelContent(PANEL_CONTENT.PROPOSAL_SUCCESS_REGISTER))
          );
        }
      });
    };
    const handleErrors = (serviceErrors: ErrorObjectType[]) => {
      setErrors(serviceErrors);
      trackSignupEmailFailure();
    };
    const unexpectedError = () => dispatch(closePanel());
    displayLegalConsent(false);
    setWaitingCallback(true);

    await UserService.register(
      user,
      success,
      handleErrors,
      unexpectedError,
      logger
    );

    setWaitingCallback(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (registerStep === 1) {
      handleStep1Submit();
      return;
    }

    handleStep2Submit();
  };

  const toggleLegalConsent = (
    event: SyntheticEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    displayLegalConsent(!needLegalConsent);
  };
  return (
    <RegisterFormUtilsAlignementWrapperStyle>
      <LegalConsent
        needLegalConsent={needLegalConsent}
        handleCheckbox={handleCheckbox}
        handleSubmit={handleSubmit}
        toggleLegalConsent={toggleLegalConsent}
      />
      <AuthenticationWrapperStyle
        aria-labelledby="register_title"
        className={needLegalConsent ? 'hidden' : ''}
      >
        {(isSecondStep || pendingProposal) && (
          <ProposalBackButtonStyle onClick={handleReturn}>
            {i18n.t('common.back')}
          </ProposalBackButtonStyle>
        )}

        <RegisterForm
          user={user}
          errors={errors}
          handleChange={handleChange}
          handleCheckbox={handleCheckbox}
          handleSubmit={userIsAChild ? toggleLegalConsent : handleSubmit}
          disableSubmit={waitingCallback}
          registerStep={registerStep}
          logger={logger}
        />
        {!pendingProposal && !isSecondStep && (
          <GreyParagraphStyle>
            {i18n.t('legal_consent.make_protect')}&nbsp;{' '}
            <PersonalDataGreyLinkStyle
              href={getDataPageLink(country, language)}
              target="_blank"
              rel="noopener"
            >
              {i18n.t('legal_consent.make_protect_link')}{' '}
            </PersonalDataGreyLinkStyle>
            <NewWindowGreyIconStyle aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}{' '}
            </ScreenReaderItemStyle>
          </GreyParagraphStyle>
        )}
      </AuthenticationWrapperStyle>
    </RegisterFormUtilsAlignementWrapperStyle>
  );
};
