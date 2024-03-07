import { TrackingService } from './index';
import {
  ILogger,
  ITrackerProvider,
  TrackingValidationError,
} from './interface';
import { TrackConfigurationType } from './types';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

const configTest: TrackConfigurationType = {
  'DISPLAY-PAGE': {
    key: 'display-page',
    description: 'Display of a page',
    recipients: ['acquisition', 'business', 'product'],
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
  'DISPLAY-OTHER': {
    key: 'display-page',
    description: 'Display of a page',
    recipients: ['business'],
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

const fakeProvider: ITrackerProvider = {
  name: 'fakeProvider',
  consent: 'advertising',
  recipients: ['acquisition'],
  send: jest.fn(),
  setEnabled: jest.fn(),
};
const fakeProvider2: ITrackerProvider = {
  name: 'fakeProvider2',
  consent: 'advertising',
  recipients: ['product'],
  send: jest.fn(),
  setEnabled: jest.fn(),
};
const fakeProvider3: ITrackerProvider = {
  name: 'fakeProvider3',
  consent: 'advertising',
  recipients: ['business'],
  send: jest.fn(),
  setEnabled: jest.fn(),
};
const fakeProvider4: ITrackerProvider = {
  name: 'fakeProvider4',
  consent: 'advertising',
  recipients: ['business', 'acquisition'],
  send: jest.fn(),
  setEnabled: jest.fn(),
};
const logger: ILogger = {
  logError: jest.fn(),
  logWarning: jest.fn(),
  logInfo: jest.fn(),
};

describe('TrackingService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
      'display-page',
      { page: expectedParams.page, optionalparam: expectedParams.optionalparam }
    );
    expect(fakeProvider2.send).toHaveBeenCalledWith(
      '123456789',
      'display-page',
      {
        page: expectedParams.page,
        event_slug: expectedParams.event_slug,
        optionalparam: expectedParams.optionalparam,
      }
    );
    expect(fakeProvider3.send).toHaveBeenCalledWith(
      '123456789',
      'display-page',
      {
        language: expectedParams.language,
        optionalparam: expectedParams.optionalparam,
      }
    );
    expect(fakeProvider4.send).toHaveBeenCalledWith(
      '123456789',
      'display-page',
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

    const trackingService = new TrackingService(
      configTest,
      [fakeProvider],
      logger
    );
    trackingService.sendAllTrackers('DISPLAY-PAGE', params);
    expect(logger.logError).toHaveBeenLastCalledWith(
      new TrackingValidationError(`Tracking error: extra param found "extra"`)
    );
    expect(fakeProvider.send).not.toHaveBeenCalled();
    expect(fakeProvider2.send).not.toHaveBeenCalled();
    expect(fakeProvider3.send).not.toHaveBeenCalled();
    expect(fakeProvider4.send).not.toHaveBeenCalled();
  });

  it('should failed - missing param', () => {
    const params = {
      page: 'page name',
      language: 'fr',
    };
    const trackingService = new TrackingService(
      configTest,
      [fakeProvider],
      logger
    );
    trackingService.sendAllTrackers('DISPLAY-PAGE', params);

    expect(logger.logError).toHaveBeenLastCalledWith(
      new TrackingValidationError(
        'Tracking error: required param not found "event_slug"'
      )
    );
    expect(fakeProvider.send).not.toHaveBeenCalled();
    expect(fakeProvider2.send).not.toHaveBeenCalled();
    expect(fakeProvider3.send).not.toHaveBeenCalled();
    expect(fakeProvider4.send).not.toHaveBeenCalled();
  });

  it('should failed - bad event name', () => {
    const trackingService = new TrackingService(
      configTest,
      [fakeProvider],
      logger
    );
    trackingService.sendAllTrackers('DISPLA-PAGE', {});

    expect(logger.logError).toHaveBeenLastCalledWith(
      new TrackingValidationError(
        'Tracking error: event not found "DISPLA-PAGE"'
      )
    );
    expect(fakeProvider.send).not.toHaveBeenCalled();
    expect(fakeProvider2.send).not.toHaveBeenCalled();
    expect(fakeProvider3.send).not.toHaveBeenCalled();
    expect(fakeProvider4.send).not.toHaveBeenCalled();
  });

  it('should failed - bad value', () => {
    const params = {
      event_slug: 'slug',
      page: 'page name',
      language: 'fr',
      optionalparam: 'test',
    };
    const trackingService = new TrackingService(
      configTest,
      [fakeProvider],
      logger
    );
    trackingService.sendAllTrackers('DISPLAY-PAGE', params);

    expect(logger.logError).toHaveBeenLastCalledWith(
      new TrackingValidationError(
        'Tracking error: invalid "test" value. "test1,test2" expected.  (optionalparam)'
      )
    );
    expect(fakeProvider.send).not.toHaveBeenCalled();
    expect(fakeProvider2.send).not.toHaveBeenCalled();
    expect(fakeProvider3.send).not.toHaveBeenCalled();
    expect(fakeProvider4.send).not.toHaveBeenCalled();
  });

  it('should failed - event not allowed for tracker', () => {
    const expectedParams = {
      event_slug: 'slug',
      page: 'page name',
      language: 'fr',
      optionalparam: 'test1',
    };
    const trackingService2 = new TrackingService(configTest, [
      fakeProvider,
      fakeProvider2,
      fakeProvider3,
      fakeProvider4,
    ]);
    trackingService2.sendAllTrackers('DISPLAY-OTHER', expectedParams);
    expect(fakeProvider.send).not.toHaveBeenCalled();
    expect(fakeProvider2.send).not.toHaveBeenCalled();
    expect(fakeProvider3.send).toHaveBeenCalled();
    expect(fakeProvider4.send).toHaveBeenCalled();
  });
});
