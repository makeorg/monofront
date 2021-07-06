/* @flow */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from 'Shared/store/actionTypes';
import * as actions from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Modal Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Creates MODAL_CLOSE when calling action', () => {
    const expectedActions = [{ type: actionTypes.MODAL_CLOSE }];

    store.dispatch(actions.modalClose());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Creates MODAL_SHOW_LOGIN when calling action', () => {
    const expectedActions = [
      {
        type: actionTypes.MODAL_SHOW_LOGIN,
      },
    ];

    store.dispatch(actions.modalShowLogin());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Creates MODAL_SHOW_REGISTER when calling action', () => {
    const expectedActions = [
      {
        type: actionTypes.MODAL_SHOW_REGISTER,
      },
    ];

    store.dispatch(actions.modalShowRegister());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Creates MODAL_SHOW_FORGOT_PASSWORD when calling action', () => {
    const expectedActions = [
      {
        type: actionTypes.MODAL_SHOW_FORGOT_PASSWORD,
      },
    ];

    store.dispatch(actions.modalShowForgotPassword());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Creates MODAL_SHOW_COUNTRIES when calling action', () => {
    const expectedActions = [
      {
        type: actionTypes.MODAL_SHOW_COUNTRIES,
        payload: { focusAfterClose: true },
      },
    ];

    store.dispatch(actions.modalShowCountries(true));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Creates MODAL_SHOW_COOKIES when calling action', () => {
    const expectedActions = [
      {
        type: actionTypes.MODAL_SHOW_COOKIES,
      },
    ];

    store.dispatch(actions.modalShowCookies());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
