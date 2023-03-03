import React, { ChangeEvent } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import {
  RedButtonCenterStyle,
  RedButtonProposalStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { ErrorObjectType, RegisterFormDataType } from '@make.org/types';
import { EmailPasswordFields } from '../../CommonFields/EmailPassword';

type Props = {
  user: RegisterFormDataType;
  emailError: ErrorObjectType;
  passwordError: ErrorObjectType;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checkRegistration: () => void;
};

export const FirstStepRegister: React.FC<Props> = ({
  user,
  emailError,
  passwordError,
  handleChange,
  checkRegistration,
}) => {
  const { state } = useAppContext();
  const { pendingProposal } = state.pendingProposal;

  return (
    <>
      <EmailPasswordFields
        emailValue={user.email}
        passwordValue={user.password}
        emailError={emailError}
        passwordError={passwordError}
        handleChange={handleChange}
        requirements
      />
      {pendingProposal ? (
        <RedButtonProposalStyle
          onClick={checkRegistration}
          disabled={!user.password || !user.email}
          id="authentication-register-submit"
        >
          {i18n.t('common.continue')}
        </RedButtonProposalStyle>
      ) : (
        <RedButtonCenterStyle
          onClick={checkRegistration}
          disabled={!user.password || !user.email}
          id="authentication-register-submit"
        >
          {i18n.t('common.continue')}
        </RedButtonCenterStyle>
      )}
    </>
  );
};
