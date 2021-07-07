import React from 'react';
import { i18n } from '@make.org/utils/i18n';

type Props = {
  email: string,
};

export const RegisterSuccessValidateMessage = ({ email }: Props) => (
  <>
    {i18n.t('common.notifications.register', {
      context: 'validate',
      email,
    })}
  </>
);
