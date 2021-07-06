/* @flow */
import { env } from 'Shared/env';
import { fbq } from './fbq';
import { FacebookTracking } from './FacebookTracking';

jest.unmock('./FacebookTracking');
jest.mock('./fbq');
jest.mock('Shared/env');

describe('Facebook Tracking Service', () => {
  beforeEach(() => {
    env.isDev.mockReturnValue(false);
  });

  afterEach(() => {
    fbq.track.mockReset();
    env.isDev.mockReset();
  });

  it('load fbq when init Facebook Tracking Service', () => {
    jest.spyOn(fbq, 'load');
    jest.spyOn(fbq, 'track');

    FacebookTracking.init();
    expect(fbq.load).toHaveBeenCalled();
    expect(fbq.track.mock.calls).toEqual([['init', '260470104426586']]);
  });

  it('dont send event in dev environnemnt', () => {
    jest.spyOn(fbq, 'track');
    const eventName = 'FooEvent';
    const eventParameters = {};
    env.isDev.mockReturnValue(true);

    FacebookTracking.trackCustom(eventName, eventParameters);

    expect(fbq.track).not.toHaveBeenCalled();
  });

  it('send event without question', () => {
    jest.spyOn(fbq, 'track');
    const eventName = 'FooEvent';
    const eventParameters = {};

    FacebookTracking.trackCustom(eventName, eventParameters);

    expect(fbq.track.mock.calls).toEqual([
      ['trackSingleCustom', '260470104426586', eventName, eventParameters],
    ]);
  });
});
