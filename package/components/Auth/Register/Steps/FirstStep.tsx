import React, { ChangeEvent } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import {
  RedButtonCenterStyle,
  RedButtonProposalStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { ErrorObjectType, RegisterFormDataType } from '@make.org/types';
import { EmailPasswordFields } from '../../../Form/EmailPassword';

type Props = {
  user: RegisterFormDataType;
  emailError: ErrorObjectType;
  passwordError: ErrorObjectType;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const FirstStepRegister: React.FC<Props> = ({
  user,
  emailError,
  passwordError,
  handleChange,
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
        validatePattern
      />
      {pendingProposal ? (
        <RedButtonProposalStyle
          disabled={!user.password || !user.email}
          id="authentication-register-submit"
          type="submit"
        >
          {i18n.t('common.continue')}
        </RedButtonProposalStyle>
      ) : (
        <RedButtonCenterStyle
          disabled={!user.password || !user.email}
          id="authentication-register-submit"
          type="submit"
        >
          {i18n.t('common.continue')}
        </RedButtonCenterStyle>
      )}
    </>
  );
};
