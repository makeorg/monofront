/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProposalType, QuestionType } from '@make.org/types';
import { AuthState } from './auth_reducer';

export type Reducer<State = any, Action = any> = (
  state: State,
  action: Action
) => State;

export type GlobalState = {
  authentification: AuthState;
  proposals: ProposalType[];
  question: QuestionType
};
export type ReducerAction = {
  type: string;
  data?: any;
};
