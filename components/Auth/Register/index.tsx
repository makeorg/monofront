// @flow
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { i18n } from 'Shared/i18n';
import { type RegisterFormDataType } from 'Shared/types/form';
import { type ErrorObjectType } from 'Shared/types/api';
import {
  SecondLevelTitleStyle,
  FourthLevelTitleStyle,
} from 'Client/ui/Elements/TitleElements';
import {
  SmallSeparatorWithMarginStyle,
  SeparatorWrapperStyle,
  TextSeparatorStyle,
  SeparatorStyle,
} from 'Client/ui/Elements/Separators';
import { RedLinkButtonStyle } from 'Client/ui/Elements/Buttons/style';
import { ExtraParagraphStyle } from 'Client/ui/Elements/Form/Styled/Content';
import { FacebookAuthentication } from 'Client/features/auth/Social/FacebookAuthentication';
import { GoogleAuthentication } from 'Client/features/auth/Social/GoogleAuthentication';
import { modalShowLogin, modalClose } from 'Shared/store/actions/modal';
import {
  trackSignupEmailSuccess,
  trackSignupEmailFailure,
} from 'Shared/services/Tracking';
import { UserService } from 'Shared/services/User';
import { Logger } from 'Shared/services/Logger';
import { getUser } from 'Shared/store/actions/authentication';
import { RegisterForm } from './Form';

import { AuthenticationWrapperStyle } from '../style';
import { LegalConsent } from './LegalConsent';

export const Register = () => {
  const dispatch = useDispatch();
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
  const userIsAChild =
    user && user.profile && user.profile.age && user.profile.age < 15;

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

  const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
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
    const handleErrors = () => {};
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

  const handleSubmit = async (event: SyntheticInputEvent<HTMLInputElement>) => {
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

  const toggleLegalConsent = (event: SyntheticInputEvent<any>) => {
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
