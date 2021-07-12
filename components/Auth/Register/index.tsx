import React, { useState } from 'react';
import { i18n } from '@make.org/utils/i18n';
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
} from '@make.org/ui/elements/Separators';
import { RedLinkButtonStyle } from '@make.org/ui/elements/Buttons/style';
import { ExtraParagraphStyle } from '@make.org/ui/elements/Form/Styled/Content';
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
import { RegisterForm } from './Form';

import { AuthenticationWrapperStyle } from '../style';
import { LegalConsent } from './LegalConsent';

export const Register: React.FC = () => {
  const { dispatch } = useAppContext();
  const [user, setUser] = useState<RegisterFormDataType>({
    email: '',
    password: '',
    profile: {
      firstname: '',
      age: '',
      postalcode: '',
      profession: '',
      legalMinorConsent: false,
      legalAdvisorApproval: false,
      approvePrivacyPolicy: false,
    },
  });
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const [waitingCallback, setWaitingCallback] = useState<boolean>(false);
  const [needLegalConsent, displayLegalConsent] = useState<boolean>(false);
  const userIsAChild = user && user.profile && user.profile.age && user.profile.age < 15;

  const handleLoginModal = () => {
    dispatch(modalShowLogin());
  };

  const handleLegalField = (fieldName: string, value: boolean) => {
    if (!fieldName || value === undefined) {
      Logger.logError(
        'HandleLegalField in register form : fieldname or value is missing'
      );
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

  const logAndLoadUser = async (email, password) => {
    const success = () => {
      dispatch(getUser(true));
    };
    const handleErrors = () => undefined;
    const unexpectedError = () => {
      dispatch(modalClose());
      // @toDo: notify user
      Logger.logError(`Login fail for ${email}`);
    };

    await UserService.login(
      email,
      password,
      undefined,
      success,
      handleErrors,
      unexpectedError
    );
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const success = () => {
      logAndLoadUser(user.email, user.password).then(() => {
        trackSignupEmailSuccess();
        dispatch(modalClose());
        setErrors([]);
      });
    };
    const handleErrors = (serviceErrors: ErrorObjectType[]) => {
      trackSignupEmailFailure();
      setErrors(serviceErrors);
    };
    const unexpectedError = () => dispatch(modalClose());
    displayLegalConsent(false);
    setWaitingCallback(true);

    await UserService.register(user, success, handleErrors, unexpectedError);

    setWaitingCallback(false);
  };

  const toggleLegalConsent = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        className={needLegalConsent && 'hidden'}
      >
        <SecondLevelTitleStyle
          id="register_title"
          data-cy-container="register-modal-title"
        >
          {i18n.t('register.title')}
        </SecondLevelTitleStyle>
        <SmallSeparatorWithMarginStyle />
        <FourthLevelTitleStyle as="h3">
          {i18n.t('register.social_connect')}
          <FacebookAuthentication />
          {i18n.t('register.or')}
          <GoogleAuthentication />
        </FourthLevelTitleStyle>
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
      </AuthenticationWrapperStyle>
    </>
  );
};
