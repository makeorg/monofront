import React from 'react';
import { i18n } from '@make.org/utils/i18n';

export const NetworkErrorMessage: React.FC = () => (
  <>{i18n.t('common.notifications.network_error')}</>
);
