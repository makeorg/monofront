import { panel } from './index';

describe('Panel reducer', () => {
  it('Return the initial state', () => {
    const expectedState = {
      isExpanded: false,
    };

    expect(panel(undefined, {})).toEqual(expectedState);
  });

  it('Open Panel', () => {
    const action = { type: 'PANEL_OPEN' };
    const previousState = {
      isExpanded: false,
    };

    const expectedState = {
      isExpanded: true,
    };

    expect(panel(previousState, action)).toEqual(expectedState);
  });

  it('Close Panel', () => {
    const action = { type: 'PANEL_CLOSE' };
    const previousState = {
      isExpanded: true,
    };

    const expectedState = {
      isExpanded: false,
    };

    expect(panel(previousState, action)).toEqual(expectedState);
  });
});
