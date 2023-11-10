import { StateRoot } from '@make.org/types';
import { sequence_state } from './reducers/sequence';
import { panel_state } from './reducers/panel';
import { modal_state } from './reducers/modal';
import { session_state } from './reducers/session';
import { notifications_state } from './reducers/notifications';
import { authentication_state } from './reducers/user/authentication';
import { trackingConsent_state } from './reducers/user/trackingConsent';
import { passwordRecovery_state } from './reducers/user/passwordRecovery';
import { pendingProposal_state } from './reducers/pendingProposal';
import { appConfig_state } from './reducers/appConfig';
import { questions_state } from './reducers/questions';
import { views_state } from './reducers/views';
import { proposals_state } from './reducers/proposals';

export const initialState: StateRoot = {
  appConfig: appConfig_state,
  views: views_state,
  pendingProposal: pendingProposal_state,
  proposals: proposals_state,
  sequence: sequence_state,
  questions: questions_state,
  currentQuestion: '',
  notifications: notifications_state,
  user: {
    authentication: authentication_state,
    passwordRecovery: passwordRecovery_state,
    trackingConsent: trackingConsent_state,
  },
  modal: modal_state,
  partners: {},
  panel: panel_state,
  session: session_state,
};

export const createInitialState = (): StateRoot =>
  JSON.parse(JSON.stringify(initialState));
