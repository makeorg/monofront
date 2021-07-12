import React from 'react';
import { i18n } from '@make.org/utils/i18n';

export const LogoutSuccessMessage: React.FC = () => (
  <>{i18n.t('common.notifications.logout', { context: 'success' })}</>
);
