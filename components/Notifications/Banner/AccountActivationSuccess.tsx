import React from 'react';
import { i18n } from '@make.org/utils/i18n';

export const AccountActivationSuccessMessage: React.FC = () => (
  <>{i18n.t('common.notifications.activate_account', { context: 'success' })}</>
);
