import { authentication_reducer } from './authentication';
import { passwordRecovery_reducer } from './passwordRecovery';
import { cookiesPreferences_reducer } from './cookiesPreferences';
import { combineReducers } from '../../utils';

export const user_reducer = combineReducers({
  authentication: authentication_reducer,
  passwordRecovery: passwordRecovery_reducer,
  cookiesPreferences: cookiesPreferences_reducer,
});
