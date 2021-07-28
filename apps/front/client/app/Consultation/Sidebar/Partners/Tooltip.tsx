// @flow
import React from 'react';
import { i18n } from 'Shared/i18n';

type Props = {
  partnerName: string,
  isFounder: boolean,
};

export const PartnerTooltip = ({ partnerName, isFounder }: Props) => (
  <>
    <span>{partnerName}</span>
    {isFounder && (
      <>
        <span>-</span>
        <span>{i18n.t('consultation.partners.founder')}</span>
      </>
    )}
  </>
);
