/* @flow */

import * as actionCreators from 'Shared/store/actions/authentication';
import { authentication } from './index';

describe('Authentication reducer', () => {
  it('Return the initial state', () => {
    const expectedState = {
      isLoggedIn: false,
      errors: [],
      user: undefined,
    };

    expect(authentication(undefined, {})).toEqual(expectedState);
  });

  describe('Login action reducers', () => {
    it('Login Request', () => {
      const action = actionCreators.loginRequest();
      const previousState = {
        isLoggedIn: false,
        errors: ['foo', 'bar'],
        user: undefined,
      };

      const expectedState = {
        isLoggedIn: false,
        errors: [],
        user: undefined,
      };

      expect(authentication(previousState, action)).toEqual(expectedState);
    });

    it('Login Success', () => {
      const action = actionCreators.loginSuccess();
      const previousState = {
        isLoggedIn: false,
        errors: ['foo', 'bar'],
        user: undefined,
      };

      const expectedState = {
        isLoggedIn: true,
        errors: [],
        user: undefined,
      };

      expect(authentication(previousState, action)).toEqual(expectedState);
    });

    it('Login Failure', () => {
      const action = actionCreators.loginFailure('fooError');
      const previousState = {
        isLoggedIn: false,
        errors: ['bazError', 'barError'],
        user: undefined,
      };

      const expectedState = {
        isLoggedIn: false,
        errors: ['fooError', 'bazError', 'barError'],
        user: undefined,
      };

      expect(authentication(previousState, action)).toEqual(expectedState);
    });
  });

  describe('Login Social action reducers', () => {
    it('Login Social Request', () => {
      const action = actionCreators.loginSocialRequest();
      const previousState = {
        isLoggedIn: false,
        errors: ['foo', 'bar'],
        user: undefined,
      };

      const expectedState = {
        isLoggedIn: false,
        errors: [],
        user: undefined,
      };

      expect(authentication(previousState, action)).toEqual(expectedState);
    });

    it('Login Social Success', () => {
      const action = actionCreators.loginSocialSuccess();
      const previousState = {
        isLoggedIn: false,
        errors: ['foo', 'bar'],
        user: undefined,
      };

      const expectedState = {
        isLoggedIn: true,
        errors: [],
        user: undefined,
      };

      expect(authentication(previousState, action)).toEqual(expectedState);
    });

    it('Login Social Failure', () => {
      const action = actionCreators.loginSocialFailure('fooError');
      const previousState = {
        isLoggedIn: false,
        errors: ['bazError', 'barError'],
        user: undefined,
      };

      const expectedState = {
        isLoggedIn: false,
        errors: [],
        user: undefined,
      };

      expect(authentication(previousState, action)).toEqual(expectedState);
    });
  });

  describe('Get user info action reducers', () => {
    it('Get user Info', () => {
      const user = {
        firstname: 'foo',
        lastname: 'bar',
      };
      const action = actionCreators.setUserInfo(user);
      const previousState = {
        isLoggedIn: false,
        errors: ['bazError', 'barError'],
        user: undefined,
      };

      const expectedState = {
        isLoggedIn: true,
        errors: ['bazError', 'barError'],
        user,
      };

      expect(authentication(previousState, action)).toEqual(expectedState);
    });
  });

  describe('Logout action reducers', () => {
    it('Logout user', () => {
      const action = actionCreators.logoutSuccess();
      const previousState = {
        isLoggedIn: true,
        errors: ['bazError', 'barError'],
        user: { firstname: 'foo' },
      };

      const expectedState = {
        isLoggedIn: false,
        errors: [],
        user: undefined,
      };

      expect(authentication(previousState, action)).toEqual(expectedState);
    });
  });
});
