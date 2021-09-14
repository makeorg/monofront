import React, { FormEvent, SyntheticEvent, useState } from 'react';
import i18n from 'i18next';
import { RegisterFormDataType, ErrorObjectType } from '@make.org/types';
import {
  SecondLevelTitleStyle,
  FourthLevelTitleStyle,
} from '@make.org/ui/elements/TitleElements';
import {
  SmallSeparatorWithMarginStyle,
  SeparatorWrapperStyle,
  TextSeparatorStyle,
  SeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { ExtraParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { FacebookAuthentication } from '@make.org/components/Auth/Social/FacebookAuthentication';
import { GoogleAuthentication } from '@make.org/components/Auth/Social/GoogleAuthentication';
import { modalShowLogin, modalClose } from '@make.org/store/actions/modal';
import {
  trackSignupEmailSuccess,
  trackSignupEmailFailure,
} from '@make.org/utils/services/Tracking';
import { UserService } from '@make.org/utils/services/User';
import { Logger } from '@make.org/utils/services/Logger';
import { useAppContext } from '@make.org/store';
import { getUser } from '@make.org/store/actions/authentication';
import { closePanel } from '@make.org/store/actions/panel';
import { RegisterForm } from './Form';
import { RegisterFormPanel } from './FormPanel';

import {
  AuthenticationWrapperStyle,
  SocialRegisterButtonsWrapperStyle,
} from '../style';
import { LegalConsent } from './LegalConsent';

type Props = {
  panel?: boolean;
};

export const Register: React.FC<Props> = ({ panel }) => {
  const { dispatch, state } = useAppContext();
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
    },
  });
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const [waitingCallback, setWaitingCallback] = useState<boolean>(false);
  const [needLegalConsent, displayLegalConsent] = useState<boolean>(false);
  const [registerPanelStep, setRegisterPanelStep] = useState<number>(1);
  const userIsAChild =
    user && user.profile && user.profile.age && user.profile.age < 15;

  const handleLoginModal = () => {
    dispatch(modalShowLogin());
  };

  const handleLegalField = (fieldName: string, value: boolean) => {
    if (!fieldName || value === undefined) {
      Logger.logError({
        message:
          'HandleLegalField in register form : fieldname or value is missing',
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
      setRegisterPanelStep(2);
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
      dispatch(modalClose());
      // @toDo: notify user
      Logger.logError({ message: `Login fail for ${email}`, name: 'register' });
    };

    await UserService.login(
      email,
      password,
      undefined,
      () => getUser(dispatch, state.modal.isOpen, true),
      () => undefined,
      () => unexpectedError()
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = () => {
      logAndLoadUser(user.email, user.password).then(() => {
        trackSignupEmailSuccess();
        if (panel) {
          dispatch(closePanel());
        } else {
          dispatch(modalClose());
        }
        setErrors([]);
      });
    };
    const handleErrors = (serviceErrors: ErrorObjectType[]) => {
      setErrors(serviceErrors);
      trackSignupEmailFailure();
    };
    const unexpectedError = () => dispatch(modalClose());
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
    <>
      <LegalConsent
        needLegalConsent={needLegalConsent}
        handleLegalField={handleLegalField}
        handleSubmit={handleSubmit}
        toggleLegalConsent={toggleLegalConsent}
      />
      <AuthenticationWrapperStyle
        aria-labelledby="register_title"
        className={needLegalConsent ? 'hidden' : ''}
      >
        {!panel ? (
          <>
            <SecondLevelTitleStyle
              id="register_title"
              data-cy-container="register-modal-title"
            >
              {i18n.t('register.title')}
            </SecondLevelTitleStyle>
            <SmallSeparatorWithMarginStyle />
            <SocialRegisterButtonsWrapperStyle>
              <FacebookAuthentication />
              <GoogleAuthentication />
            </SocialRegisterButtonsWrapperStyle>
            <SeparatorWrapperStyle>
              <SeparatorStyle />
              <TextSeparatorStyle>{i18n.t('register.or')}</TextSeparatorStyle>
              <SeparatorStyle />
            </SeparatorWrapperStyle>
            <FourthLevelTitleStyle as="h3">
              {i18n.t('register.subtitle')}
            </FourthLevelTitleStyle>
            <RegisterForm
              user={user}
              errors={errors}
              handleChange={handleChange}
              handleLegalField={handleLegalField}
              handleSubmit={userIsAChild ? toggleLegalConsent : handleSubmit}
              disableSubmit={waitingCallback}
            />
            <ExtraParagraphStyle>
              {i18n.t('register.login_title')}
              <RedLinkButtonStyle onClick={handleLoginModal}>
                {i18n.t('register.login_link')}
              </RedLinkButtonStyle>
            </ExtraParagraphStyle>
          </>
        ) : (
          <RegisterFormPanel
            user={user}
            errors={errors}
            handleChange={handleChange}
            handleLegalField={handleLegalField}
            handleSubmit={userIsAChild ? toggleLegalConsent : handleSubmit}
            disableSubmit={waitingCallback}
            checkRegistration={checkRegistration}
            registerPanelStep={registerPanelStep}
          />
        )}
      </AuthenticationWrapperStyle>
    </>
  );
};
