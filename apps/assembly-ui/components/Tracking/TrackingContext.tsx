import { TrackingConsentType } from '@make.org/tracking/types';
import { createContext } from 'react';

type TrackFunctionType = (
  eventName: string,
  params: Record<string, string>
) => void;
type UpdateFromConsentFunctionType = (
  consent: TrackingConsentType | null
) => Promise<{ sessionId: string; visitorId: string } | null>;

export type ITrackingContext = {
  track: TrackFunctionType;
  updateFromConsent: UpdateFromConsentFunctionType;
};

const initialValue = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
  track: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
  updateFromConsent: () => Promise.resolve(null),
};

export const TrackingContext = createContext<ITrackingContext>(initialValue);
