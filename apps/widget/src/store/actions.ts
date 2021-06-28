import { auth_actions } from './reducers/auth_reducer';
import { proposals_actions } from './reducers/proposals_reducer';

// actions
export const ACTIONS = {
  ...auth_actions,
  ...proposals_actions,
};
