import { auth_actions } from './reducers/auth_reducer';
import { question_actions } from './reducers/question_reducer';

// actions
export const ACTIONS = {
  ...auth_actions,
  ...question_actions,
};
