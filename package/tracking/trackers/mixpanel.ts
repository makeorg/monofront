import { MixpanelTracking } from '@make.org/utils/services/Trackers/MixpanelTracking';
import { TrackerProviderType } from '../interface';

export const MixpanelTracker: TrackerProviderType = {
  name: 'mixpanel',
  recipients: ['product'],

  send: (
    uniqueId: string,
    eventName: string,
    params: Record<string, string>
  ): void => {
    MixpanelTracking.track(eventName, {
      ...params,
      distinctId: uniqueId,
    });
  },
};
