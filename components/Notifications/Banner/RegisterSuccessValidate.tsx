import React from 'react';
import i18n from 'i18next';

type Props = {
  email: string;
};

export const RegisterSuccessValidateMessage: React.FC<Props> = ({ email }) => (
  <>
    {i18n.t('common.notifications.register', {
      context: 'validate',
      email,
    })}
  </>
);
