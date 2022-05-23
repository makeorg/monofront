import React from 'react';
import { getAppLocationContext } from '@make.org/utils/helpers/getLocationContext';

const consultationLocations = new Set([
  'sequence',
  'page-participate',
  'page-explore',
  'page-results',
]);

export const RegisterConfirmation: React.FC = () => {
  const location = getAppLocationContext(window?.location?.pathname).trim();
  const isConsultation = consultationLocations.has(location);

  return (
    <div>
      {isConsultation ? (
        <div>Consultation page</div>
      ) : (
        <div>Register confirmation !</div>
      )}
    </div>
  );
};
