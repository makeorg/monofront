import React from 'react';
import { i18n } from '@make.org/utils/i18n';

export const LoginSuccessMessage: React.FC = () => (
  <>{i18n.t('common.notifications.login', { context: 'success' })}</>
);
