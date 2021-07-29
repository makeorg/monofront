import React, { FC } from 'react';
import i18n from 'i18next';

type Props = {
  partnerName: string;
  isFounder: boolean;
};

export const PartnerTooltip: FC<Props> = ({ partnerName, isFounder }) => (
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
