import { ReducerAction, StateTrackingConsent } from '@make.org/types';
import {
  ACCEPT_ALL_TRACKING_CONSENT,
  REJECT_ALL_TRACKING_CONSENT,
  UPDATE_TRACKING_CONSENT,
} from '../../../actionTypes';

export const updateTrackingConsent = (
  tracker: keyof StateTrackingConsent,
  value: boolean
): ReducerAction => ({
  type: UPDATE_TRACKING_CONSENT,
  payload: { consentUpdate: { [tracker]: value } },
});

export const acceptAllTrackingConsent = (): ReducerAction => ({
  type: ACCEPT_ALL_TRACKING_CONSENT,
});

export const rejectAllTrackingConsent = (): ReducerAction => ({
  type: REJECT_ALL_TRACKING_CONSENT,
});
