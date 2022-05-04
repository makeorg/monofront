import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import i18n from 'i18next';
import { ErrorObjectType, RegisterFormDataType } from '@make.org/types';
import { FormLeftAlignStyle } from '@make.org/ui/elements/FormElements';
import { getFieldError } from '@make.org/utils/helpers/form';
import { FORM } from '@make.org/types/enums';
import { throttle } from '@make.org/utils/helpers/throttle';
import { trackDisplaySignupForm } from '@make.org/utils/services/Tracking';
import { useAppContext } from '@make.org/store';
import {
  SeparatorStyle,
  SeparatorWrapperStyle,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { modalShowLogin } from '@make.org/store/actions/modal';
import { TitleForm } from './Title';
import { FirstStepRegister } from './FirstStep';
import { SecondStepRegister } from './SecondStep';
import {
  RegisterParagraphStyle,
  SocialRegisterButtonsWrapperStyle,
} from '../style';
import { FacebookAuthentication } from '../Social/FacebookAuthentication';
import { GoogleAuthentication } from '../Social/GoogleAuthentication';

type Props = {
  user: RegisterFormDataType;
  errors: ErrorObjectType[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (fieldName: string, value: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  checkRegistration: () => void;
  disableSubmit: boolean;
  registerStep: number;
  isProposalSubmit?: boolean;
};
/**
 * Renders Register Form
 */
export const RegisterForm: React.FC<Props> = ({
  user,
  errors,
  handleChange,
  handleCheckbox,
  handleSubmit,
  checkRegistration,
  disableSubmit,
  registerStep,
  isProposalSubmit,
}) => {
  const emailError = getFieldError('email', errors);
  const passwordError = getFieldError('password', errors);
  const firstnameError = getFieldError('firstname', errors);
  const ageError = getFieldError('dateofbirth', errors);
  const postalcodeError = getFieldError('postalcode', errors);
  const { dispatch } = useAppContext();

  const handleLoginModal = () => {
    dispatch(modalShowLogin());
  };

  useEffect(() => {
    trackDisplaySignupForm(`${registerStep}`);
  }, [registerStep]);

  return (
    <FormLeftAlignStyle
      id={FORM.REGISTER_PANEL_FORMNAME}
      onSubmit={throttle(handleSubmit)}
    >
      <TitleForm errors={errors} registerStep={registerStep} />
      {registerStep === 1 && (
        <>
          <FirstStepRegister
            user={user}
            emailError={emailError}
            passwordError={passwordError}
            handleChange={handleChange}
            checkRegistration={checkRegistration}
          />
          {!isProposalSubmit && (
            <>
              <SeparatorWrapperStyle className="margin-top margin-bottom">
                <SeparatorStyle />
                <TextSeparatorStyle>{i18n.t('register.or')}</TextSeparatorStyle>
                <SeparatorStyle />
              </SeparatorWrapperStyle>
              <SocialRegisterButtonsWrapperStyle>
                <GoogleAuthentication />
                <FacebookAuthentication />
              </SocialRegisterButtonsWrapperStyle>
              <RegisterParagraphStyle>
                {i18n.t('register.login_title')}
                <RedLinkButtonStyle onClick={handleLoginModal}>
                  {i18n.t('register.login_link')}
                </RedLinkButtonStyle>
              </RegisterParagraphStyle>
            </>
          )}
        </>
      )}
      {registerStep === 2 && (
        <SecondStepRegister
          user={user}
          firstnameError={firstnameError}
          ageError={ageError}
          postalcodeError={postalcodeError}
          handleChange={handleChange}
          handleCheckbox={handleCheckbox}
          disableSubmit={disableSubmit}
        />
      )}
    </FormLeftAlignStyle>
  );
};
