import { ApiService } from 'Shared/api/ApiService';
import {
  DemographicsTrackingApiService,
  DEMOGRAPHICS_TRACKING_PATH,
} from './DemographicsTrackingApiService';

jest.mock('./ApiService');

describe('DemographicsTrackingApiService', () => {
  beforeEach(() => {
    ApiService.callApi.mockClear();
    jest.spyOn(ApiService, 'callApi');
    ApiService.questionId = '49c68ed3-62ca-47b2-b552-9866bf52c89b';
    ApiService.country = 'FR';
  });

  describe('track', () => {
    it('must call ApiService.callApi', async () => {
      const expected =
        '{"demographic":"age","value":"18-25","questionId":"49c68ed3-62ca-47b2-b552-9866bf52c89b","source":"core","country":"FR","parameters":{"utm_campaign":"ma campagne d\'acquisition","utm_source":"facebook"}}';

      await DemographicsTrackingApiService.track('age', '18-25', {
        utm_campaign: "ma campagne d'acquisition",
        utm_source: 'facebook',
      });
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        DEMOGRAPHICS_TRACKING_PATH,
        {
          method: 'POST',
          body: expected,
          allowedHeaders: [
            'x-make-country',
            'x-make-question-id',
            'x-make-app-name',
            'x-make-location',
            'x-make-external-id',
            'x-hostname',
          ],
          withCredentials: false,
        }
      );
    });
  });

  it('must call ApiService.callApi without parameters', async () => {
    const expected =
      '{"demographic":"age","value":"18-25","questionId":"49c68ed3-62ca-47b2-b552-9866bf52c89b","source":"core","country":"FR","parameters":{}}';

    await DemographicsTrackingApiService.track('age', '18-25');
    expect(ApiService.callApi).toHaveBeenNthCalledWith(
      1,
      DEMOGRAPHICS_TRACKING_PATH,
      {
        method: 'POST',
        body: expected,
        allowedHeaders: [
          'x-make-country',
          'x-make-question-id',
          'x-make-app-name',
          'x-make-location',
          'x-make-external-id',
          'x-hostname',
        ],
        withCredentials: false,
      }
    );
  });
});
