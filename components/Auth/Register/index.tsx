import React, { FormEvent, SyntheticEvent, useState } from 'react';
import i18n from 'i18next';
import { RegisterFormDataType, ErrorObjectType } from '@make.org/types';
import { closePanel, setPanelContent } from '@make.org/store/actions/panel/';
import {
  trackSignupEmailSuccess,
  trackSignupEmailFailure,
} from '@make.org/utils/services/Tracking';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import { UserService } from '@make.org/utils/services/User';
import { Logger } from '@make.org/utils/services/Logger';
import { useAppContext } from '@make.org/store';
import { getUser } from '@make.org/store/actions/authentication';
import { ProposalSuccess } from '@make.org/components/Proposal/Submit/Success';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { NewWindowGreyIconStyle } from '@make.org/ui/elements/LinkElements';
import { setRegisterStep } from '@make.org/store/actions/pendingProposal';
import { RegisterForm } from './Forms/Form';
// import { RegisterConfirmation } from './Steps/RegisterConfirmation';
import { RegisterConfirmation } from './Steps/RegisterConfirmation';
import {
  AuthenticationWrapperStyle,
  GreyParagraphStyle,
  PersonalDataGreyLinkStyle,
  RegisterFormUtilsAlignementWrapperStyle,
} from '../style';
import { LegalConsent } from './Forms/LegalConsent';
import { ProposalBackButtonStyle } from '../../Proposal/Submit/style';
import { ProposalAuthentication } from '../../Proposal/Submit/Authentication';
import { Login } from '../Login';

export const Register: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { pendingProposal, registerStep } = state.pendingProposal;
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
  const userIsAChild =
    user && user.profile && user.profile.age && user.profile.age < 15;
  const isSecondStep = registerStep === 2;

  const handleReturn = () => {
    if (isSecondStep) {
      dispatch(setRegisterStep(1));
      return;
    }
    if (pendingProposal) {
      dispatch(setPanelContent(<ProposalAuthentication />));
      return;
    }
    dispatch(setPanelContent(<Login />));
  };

  const handleCheckbox = (fieldName: string, value: boolean) => {
    if (!fieldName || value === undefined) {
      Logger.logError({
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

  // checks email and password validity on first step of panel registration
  const checkRegistration = async () => {
    const success = () => {
      dispatch(setRegisterStep(2));
      setErrors([]);
    };
    const handleErrors = (serviceErrors: ErrorObjectType[]) => {
      setErrors(serviceErrors);
    };
    const unexpectedError = () => dispatch(closePanel());

    await UserService.checkRegistration(
      user.email,
      user.password,
      success,
      handleErrors,
      unexpectedError
    );
  };

  const logAndLoadUser = async (email: string, password: string) => {
    const unexpectedError = () => {
      dispatch(closePanel());
      // @toDo: notify user
      Logger.logError({ message: `Login fail for ${email}`, name: 'register' });
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = () => {
      logAndLoadUser(user.email, user.password).then(async () => {
        trackSignupEmailSuccess();
        setErrors([]);
        if (!pendingProposal) {
          dispatch(setPanelContent(<RegisterConfirmation />));
          // Replace <RegisterConfirmation /> with :
          //   <OptInCGU
          //   disableSubmit
          //   handleCheckbox={handleCheckbox}
          // />
        }

        // Display the proposal in the proposal submit context
        if (pendingProposal) {
          await ProposalService.propose(
            pendingProposal,
            question.questionId,
            () => dispatch(setPanelContent(<ProposalSuccess isRegister />))
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

    await UserService.register(user, success, handleErrors, unexpectedError);

    setWaitingCallback(false);
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
          checkRegistration={checkRegistration}
        />
        {!pendingProposal && !isSecondStep && (
          <GreyParagraphStyle>
            {i18n.t('legal_consent.make_protect')}&nbsp;
            <PersonalDataGreyLinkStyle
              href={getDataPageLink(country, language)}
              target="_blank"
              rel="noopener"
            >
              {i18n.t('legal_consent.make_protect_link')}
            </PersonalDataGreyLinkStyle>
            <NewWindowGreyIconStyle aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}
            </ScreenReaderItemStyle>
          </GreyParagraphStyle>
        )}
      </AuthenticationWrapperStyle>
    </RegisterFormUtilsAlignementWrapperStyle>
  );
};
