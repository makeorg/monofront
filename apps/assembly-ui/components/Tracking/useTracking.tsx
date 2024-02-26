import { useContext } from 'react';
import { ITrackingContext, TrackingContext } from './TrackingContext';

export const useTracking = (): ITrackingContext => {
  const trackingContext = useContext(TrackingContext);

  return trackingContext;
};
