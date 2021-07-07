import React from 'react';
import { i18n } from '@make.org/utils/i18n';

export const AccountDeletionSuccessMessage = (): React.FC => (
  <>{i18n.t('common.notifications.delete_account', { context: 'success' })}</>
);
