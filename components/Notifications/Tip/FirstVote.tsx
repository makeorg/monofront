import React from 'react';
import { i18n } from '@make.org/utils/i18n';

export const FirstVoteTip = (): JSX.Element => (
  <>{i18n.t('common.notifications.vote_on_proposal')}</>
);
