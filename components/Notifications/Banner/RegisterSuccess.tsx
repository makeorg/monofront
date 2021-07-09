import React from 'react';
import { i18n } from '@make.org/utils/i18n';

export const RegisterSuccessMessage: React.FC = () => (
  <>{i18n.t('common.notifications.register', { context: 'success' })}</>
);
