import { StateRoot } from '@make.org/types';
import { sequence_state } from './reducers/sequence';
import { panel_state } from './reducers/panel';
import { modal_state } from './reducers/modal';
import { session_state } from './reducers/session';
import { notifications_state } from './reducers/notifications';
import { authentication_state } from './reducers/user/authentication';
import { cookiesPreferences_state } from './reducers/user/cookiesPreferences';
import { passwordRecovery_state } from './reducers/user/passwordRecovery';
import { proposal_state } from './reducers/proposal';
import { appConfig_state } from './reducers/appConfig';
import { questions_state } from './reducers/questions';

export const initialState: StateRoot = {
  appConfig: appConfig_state,
  views: {},
  proposal: proposal_state,
  sequence: sequence_state,
  questions: questions_state,
  currentQuestion: '',
  notifications: notifications_state,
  user: {
    authentication: authentication_state,
    passwordRecovery: passwordRecovery_state,
    cookiesPreferences: cookiesPreferences_state,
  },
  modal: modal_state,
  partners: {},
  panel: panel_state,
  session: session_state,
  question: undefined,
  proposals: [],
};

export const createInitialState = (): StateRoot =>
  JSON.parse(JSON.stringify(initialState));
