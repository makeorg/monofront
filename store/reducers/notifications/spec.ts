/* @flow */
import {
  LOGIN_SUCCESS_MESSAGE,
  NOTIFICATION_LEVEL_SUCCESS,
  NOTIFICATION_LEVEL_INFORMATION,
  FIRST_VOTE_TIP_MESSAGE,
} from 'Shared/constants/notifications';
import { notifications } from './index';

describe('Notification reducer', () => {
  it('Return the initial state', () => {
    const expectedState = { banner: {}, tip: {}, dismissed: [] };

    expect(notifications(undefined, {})).toEqual(expectedState);
  });

  it('Closes & Clears Notification Banner', () => {
    const action = { type: 'CLOSE_NOTIFICATION_BANNER' };
    const previousState = {
      banner: {
        contentId: LOGIN_SUCCESS_MESSAGE,
        level: NOTIFICATION_LEVEL_SUCCESS,
      },
    };

    const expectedState = { banner: {} };

    expect(notifications(previousState, action)).toEqual(expectedState);
  });

  it('Closes & Clears Notification Tip', () => {
    const action = { type: 'CLOSE_NOTIFICATION_TIP' };
    const previousState = {
      tip: {
        contentId: FIRST_VOTE_TIP_MESSAGE,
        level: NOTIFICATION_LEVEL_INFORMATION,
      },
    };

    const expectedState = { tip: {} };

    expect(notifications(previousState, action)).toEqual(expectedState);
  });

  it('Dismisses Notification', () => {
    const action = {
      type: 'DISMISS_NOTIFICATION',
      payload: { contentId: FIRST_VOTE_TIP_MESSAGE },
    };
    const previousState = {
      dismissed: [],
    };

    const expectedState = {
      dismissed: [FIRST_VOTE_TIP_MESSAGE],
    };

    expect(notifications(previousState, action)).toEqual(expectedState);
  });

  it('Displays Notification Banner', () => {
    const action = {
      type: 'DISPLAY_NOTIFICATION_BANNER',
      payload: {
        contentId: LOGIN_SUCCESS_MESSAGE,
        level: NOTIFICATION_LEVEL_SUCCESS,
        toDismiss: true,
      },
    };

    const previousState = {
      banner: {},
    };

    const expectedState = {
      banner: {
        contentId: LOGIN_SUCCESS_MESSAGE,
        level: NOTIFICATION_LEVEL_SUCCESS,
        params: {},
        toDismiss: true,
      },
    };
    expect(notifications(previousState, action)).toEqual(expectedState);
  });
});
