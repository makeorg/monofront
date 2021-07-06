/* @flow */

import * as contentTypes from 'Shared/constants/modal';
import { modal } from './index';

describe('Modal reducer', () => {
  it('Return the initial state', () => {
    const expectedState = {
      isOpen: false,
      contentType: '',
      showExpirationSession: false,
      showCookies: false,
      focusAfterClose: true,
      extraProps: {},
      showDataPolicy: false,
    };

    expect(modal(undefined, {})).toEqual(expectedState);
  });

  it('Show login action reducers', () => {
    const action = { type: 'MODAL_SHOW_LOGIN' };
    const previousState = {
      isOpen: false,
      contentType: '',
    };

    const expectedState = {
      isOpen: true,
      contentType: contentTypes.MODAL_LOGIN,
    };

    expect(modal(previousState, action)).toEqual(expectedState);
  });

  it('Show register action reducers', () => {
    const action = { type: 'MODAL_SHOW_REGISTER' };
    const previousState = {
      isOpen: false,
      contentType: '',
    };

    const expectedState = {
      isOpen: true,
      contentType: contentTypes.MODAL_REGISTER,
    };

    expect(modal(previousState, action)).toEqual(expectedState);
  });

  it('Show forgot password action reducers', () => {
    const action = { type: 'MODAL_SHOW_FORGOT_PASSWORD' };
    const previousState = {
      isOpen: false,
      contentType: '',
    };

    const expectedState = {
      isOpen: true,
      contentType: contentTypes.MODAL_FORGOT_PASSWORD,
    };

    expect(modal(previousState, action)).toEqual(expectedState);
  });

  it('Show countries action reducers', () => {
    const action = {
      type: 'MODAL_SHOW_COUNTRIES',
      payload: { focusAfterClose: false },
    };
    const previousState = {
      isOpen: false,
      contentType: '',
      focusAfterClose: true,
    };

    const expectedState = {
      isOpen: true,
      contentType: contentTypes.MODAL_COUNTRIES,
      focusAfterClose: false,
    };

    expect(modal(previousState, action)).toEqual(expectedState);
  });

  it('Close Login action reducers', () => {
    const action = { type: 'MODAL_CLOSE' };
    const previousState = {
      isOpen: true,
      focusAfterClose: false,
    };

    const expectedState = {
      isOpen: false,
      focusAfterClose: true,
    };

    expect(modal(previousState, action)).toEqual(expectedState);
  });

  it('Show cookie action reducers', () => {
    const action = { type: 'MODAL_SHOW_COOKIES' };
    const previousState = {
      showCookies: false,
    };

    const expectedState = {
      showCookies: true,
    };

    expect(modal(previousState, action)).toEqual(expectedState);
  });

  it('Show login data policy action reducers', () => {
    const action = {
      type: 'MODAL_SHOW_DATAPOLICY_LOGIN',
      payload: { email: 'foo', password: 'bar' },
    };
    const previousState = {
      isOpen: true,
      contentType: '',
    };

    const expectedState = {
      isOpen: false,
      contentType: '',
      showDataPolicy: true,
      isLogin: true,
      extraProps: { email: 'foo', password: 'bar' },
    };

    expect(modal(previousState, action)).toEqual(expectedState);
  });

  it('Show social data policy action reducers', () => {
    const action = {
      type: 'MODAL_SHOW_DATAPOLICY_SOCIAL',
      payload: { provider: 'foo', token: 'bar' },
    };
    const previousState = {
      isOpen: true,
      contentType: '',
    };

    const expectedState = {
      isOpen: false,
      contentType: '',
      showDataPolicy: true,
      isLogin: false,
      extraProps: { provider: 'foo', token: 'bar' },
    };

    expect(modal(previousState, action)).toEqual(expectedState);
  });

  it('Close cookie action reducers', () => {
    const action = { type: 'MODAL_CLOSE_COOKIES' };
    const previousState = {
      showCookies: true,
    };

    const expectedState = {
      showCookies: false,
    };

    expect(modal(previousState, action)).toEqual(expectedState);
  });

  it('Close data policy action reducers', () => {
    const action = {
      type: 'MODAL_CLOSE_DATAPOLICY',
      payload: { extraProps: { email: 'foo', password: 'bar' } },
    };
    const previousState = {
      isOpen: false,
      showDataPolicy: true,
      extraProps: { email: 'foo', password: 'bar' },
    };

    const expectedState = {
      isOpen: false,
      showDataPolicy: false,
      extraProps: {},
    };

    expect(modal(previousState, action)).toEqual(expectedState);
  });
});
