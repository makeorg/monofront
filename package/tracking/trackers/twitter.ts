import { TwitterTracking } from '@make.org/utils/services/Trackers/TwitterTracking';
import { TrackerProviderType } from '../interface';

export const TwitterTracker: TrackerProviderType = {
  name: 'Twitter',
  recipients: ['acquisition'],

  send: (
    uniqueId: string,
    eventName: string,
    params: Record<string, string>
  ): void => {
    TwitterTracking.track(eventName, uniqueId);
  },
};
