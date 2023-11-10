import { authentication_reducer } from '@make.org/store/reducers/user/authentication';
import { passwordRecovery_reducer } from '@make.org/store/reducers/user/passwordRecovery';
import { trackingConsent_reducer } from '@make.org/store/reducers/user/trackingConsent';
import { combineReducers } from '@make.org/store/utils';

export const user_reducer = combineReducers({
  authentication: authentication_reducer,
  passwordRecovery: passwordRecovery_reducer,
  trackingConsent: trackingConsent_reducer,
});
