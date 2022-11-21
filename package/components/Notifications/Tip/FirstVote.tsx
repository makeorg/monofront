import React from 'react';
import i18n from 'i18next';

export const FirstVoteTip = (): JSX.Element => (
  <>{i18n.t('common.notifications.vote_on_proposal')}</>
);
