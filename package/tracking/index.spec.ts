import { TrackingService } from './index';
import { TrackerProviderType } from './interface';
import { TrackConfigurationType } from './types';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

const configTest: TrackConfigurationType = {
  'DISPLAY-PAGE': {
    key: 'display-page',
    description: 'Display of a page',
    parameters: [
      {
        key: 'event_slug',
        description: 'The event slug',
        purpose: 'Subject segmentation - improving service',
        example: 'convention-fin-de-vie',
        recipients: ['product'],
      },
      {
        key: 'page',
        description: 'Page name',
        example: 'event-page',
        purpose: 'Measuring the number of visitors to a page',
        recipients: ['product', 'acquisition'],
      },
      {
        key: 'language',
        description: 'Interface language',
        purpose: 'Language segmentation - improving service',
        recipients: ['business'],
      },
      {
        key: 'optionalparam',
        description: 'Interface language',
        purpose: 'Language segmentation - improving service',
        values: ['test1', 'test2'],
        recipients: ['business', 'acquisition', 'product'],
        optional: true,
      },
    ],
  },
};

const fakeProvider: TrackerProviderType = {
  name: 'Facebook',
  recipients: ['acquisition'],
  send: jest.fn(),
};
const fakeProvider2: TrackerProviderType = {
  name: 'Facebook',
  recipients: ['product'],
  send: jest.fn(),
};
const fakeProvider3: TrackerProviderType = {
  name: 'Facebook',
  recipients: ['business'],
  send: jest.fn(),
};
const fakeProvider4: TrackerProviderType = {
  name: 'Facebook',
  recipients: ['business', 'acquisition'],
  send: jest.fn(),
};

describe('TrackingService', () => {
  it('should validate', () => {
    const expectedParams = {
      event_slug: 'slug',
      page: 'page name',
      language: 'fr',
      optionalparam: 'test1',
    };
    const trackingService = new TrackingService(configTest, [
      fakeProvider,
      fakeProvider2,
      fakeProvider3,
      fakeProvider4,
    ]);
    trackingService.sendAllTrackers('DISPLAY-PAGE', expectedParams);
    expect(fakeProvider.send).toHaveBeenCalledWith(
      '123456789',
      'DISPLAY-PAGE',
      { page: expectedParams.page, optionalparam: expectedParams.optionalparam }
    );
    expect(fakeProvider2.send).toHaveBeenCalledWith(
      '123456789',
      'DISPLAY-PAGE',
      {
        page: expectedParams.page,
        event_slug: expectedParams.event_slug,
        optionalparam: expectedParams.optionalparam,
      }
    );
    expect(fakeProvider3.send).toHaveBeenCalledWith(
      '123456789',
      'DISPLAY-PAGE',
      {
        language: expectedParams.language,
        optionalparam: expectedParams.optionalparam,
      }
    );
    expect(fakeProvider4.send).toHaveBeenCalledWith(
      '123456789',
      'DISPLAY-PAGE',
      {
        page: expectedParams.page,
        language: expectedParams.language,
        optionalparam: expectedParams.optionalparam,
      }
    );
  });

  it('should failed - extra param', () => {
    const params = {
      event_slug: 'slug',
      page: 'page name',
      language: 'fr',
      extra: 'value',
    };
    const trackingService = new TrackingService(configTest, [fakeProvider]);
    expect(() =>
      trackingService.sendAllTrackers('DISPLAY-PAGE', params)
    ).toThrowError('Tracking error : extra param found "extra"');
  });

  it('should failed - missing param', () => {
    const params = {
      page: 'page name',
      language: 'fr',
    };
    const trackingService = new TrackingService(configTest, [fakeProvider]);
    expect(() =>
      trackingService.sendAllTrackers('DISPLAY-PAGE', params)
    ).toThrowError('Tracking error : required param not found "event_slug"');
  });

  it('should failed - bad event name', () => {
    const trackingService = new TrackingService(configTest, [fakeProvider]);
    expect(() =>
      trackingService.sendAllTrackers('DISPLA-PAGE', {})
    ).toThrowError('Tracking error : event not found "DISPLA-PAGE"');
  });

  it('should failed - bad value', () => {
    const params = {
      event_slug: 'slug',
      page: 'page name',
      language: 'fr',
      optionalparam: 'test',
    };
    const trackingService = new TrackingService(configTest, [fakeProvider]);
    expect(() =>
      trackingService.sendAllTrackers('DISPLAY-PAGE', params)
    ).toThrowError(
      'Tracking error : invalid "test" value. "test1,test2" expected.  (optionalparam)'
    );
  });
});
