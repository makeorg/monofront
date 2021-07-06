import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from 'Shared/store/actionTypes';
import {
  LOGIN_SUCCESS_MESSAGE,
  NOTIFICATION_LEVEL_SUCCESS,
  NOTIFICATION_LEVEL_INFORMATION,
  FIRST_VOTE_TIP_MESSAGE,
} from 'Shared/constants/notifications';
import * as actions from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Notification Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Creates CLOSE_NOTIFICATION_BANNER when calling action', () => {
    const expectedActions = [{ type: actionTypes.CLOSE_NOTIFICATION_BANNER }];

    store.dispatch(actions.clearNotificationBanner());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Creates CLOSE_NOTIFICATION_TIP when calling action', () => {
    const expectedActions = [{ type: actionTypes.CLOSE_NOTIFICATION_TIP }];

    store.dispatch(actions.clearNotificationTip());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Creates DISMISS_NOTIFICATION when calling action', () => {
    const expectedActions = [
      {
        type: actionTypes.DISMISS_NOTIFICATION,
        payload: { contentId: FIRST_VOTE_TIP_MESSAGE },
      },
    ];

    store.dispatch(actions.dismissNotification(FIRST_VOTE_TIP_MESSAGE));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Creates DISPLAY_NOTIFICATION_BANNER when calling action', () => {
    const tagToDismiss = true;

    const expectedActions = [
      {
        type: actionTypes.DISPLAY_NOTIFICATION_BANNER,
        payload: {
          contentId: LOGIN_SUCCESS_MESSAGE,
          level: NOTIFICATION_LEVEL_SUCCESS,
          params: { questionId: 'QUESTION_ID' },
          toDismiss: tagToDismiss,
        },
      },
    ];

    store.dispatch(
      actions.displayNotificationBanner(
        LOGIN_SUCCESS_MESSAGE,
        NOTIFICATION_LEVEL_SUCCESS,
        { questionId: 'QUESTION_ID' },
        tagToDismiss
      )
    );

    expect(store.getActions()).toEqual(expectedActions);
  });
});
