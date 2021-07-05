// @flow
import { useEffect } from 'react';
import { trackDisplaySequence } from '@make.org/utils/services/Tracking';

export const useSequenceTracking = (): void => {
  useEffect(() => {
    trackDisplaySequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
