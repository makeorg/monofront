import { TrackingConsentType } from '@make.org/tracking/types';
import { createContext } from 'react';

type TrackFunctionType = (
  eventName: string,
  params: Record<string, string>
) => void;
type UpdateFromConsentFunctionType = (
  consent: TrackingConsentType | null
) => void;

export type ITrackingContext = {
  track: TrackFunctionType;
  updateFromConsent: UpdateFromConsentFunctionType;
};

const initialValue = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
  track: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
  updateFromConsent: () => { },
};

export const TrackingContext = createContext<ITrackingContext>(initialValue);
