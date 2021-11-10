import { buildTimeline, getStepTitle } from './timeline';

jest.mock('./timeline', () => ({
  RESULT_STEP: 'result',
  WORKSHOP_STEP: 'workshop',
  ACTION_STEP: 'action',
  getStepTitle: jest.fn(),
  buildTimeline: jest.fn(),
}));

const mockedGetStepTitle = getStepTitle as jest.Mocked<any>;
const mockedGetBuildTimeline = buildTimeline as jest.Mocked<any>;

describe('timeline helper', () => {
  describe('Build timeline', () => {
    const timeline = {
      action: {
        date: '2021-03-20',
        dateText: 'Mars 2021',
        description: 'foo',
      },
      result: {
        date: '2021-02-23',
        dateText: 'Fevrier 2021',
        description: 'bar',
      },
      workshop: {
        date: '2021-04-13',
        dateText: 'Mai 2021',
        description: 'baz',
      },
    };
    const sortedTimeline = [
      {
        name: 'result',
        date: '2021-02-23',
        dateText: 'Fevrier 2021',
        description: 'bar',
      },
      {
        name: 'action',
        date: '2021-03-20',
        dateText: 'Mars 2021',
        description: 'foo',
      },
      {
        name: 'workshop',
        date: '2021-04-13',
        dateText: 'Mai 2021',
        description: 'baz',
      },
    ];

    it('return sorted timeline', () => {
      mockedGetBuildTimeline.mockReturnValue(sortedTimeline);
      expect(buildTimeline(timeline)).toEqual(sortedTimeline);
    });
  });

  describe('Get step Title', () => {
    it('return result step title', () => {
      mockedGetStepTitle.mockReturnValue('consultation.timeline.result_title');
      expect(getStepTitle('result')).toEqual(
        'consultation.timeline.result_title'
      );
    });
    it('return workshop step title', () => {
      mockedGetStepTitle.mockReturnValue(
        'consultation.timeline.workshop_title'
      );
      expect(getStepTitle('workshop')).toEqual(
        'consultation.timeline.workshop_title'
      );
    });
    it('return action step title', () => {
      mockedGetStepTitle.mockReturnValue('consultation.timeline.action_title');
      expect(getStepTitle('action')).toEqual(
        'consultation.timeline.action_title'
      );
    });
    it('return default', () => {
      mockedGetStepTitle.mockReturnValue('');
      expect(getStepTitle('foo')).toEqual('');
    });
  });
});
