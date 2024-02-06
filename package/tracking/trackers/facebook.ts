import { TrackingApiService } from '@make.org/api/services/TrackingApiService';
import { TrackerProviderType } from '../interface';

export const FacebookTracker: TrackerProviderType = {
  name: 'Facebook',
  recipients: ['acquisition'],

  send: (
    uniqueId: string,
    eventName: string,
    params: Record<string, string>
  ): void => {
    const parameters = {
      eventName,
      eventParameters: {
        uniqueId,
        ...params,
      },
      eventType: 'trackCustom',
    };

    TrackingApiService.track(parameters).then();
  },
};
