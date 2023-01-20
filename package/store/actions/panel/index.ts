import { ReducerAction } from '@make.org/types';
import {
  PANEL_CLOSE,
  PANEL_REMOVE_CONTENT,
  PANEL_SET_CONTENT,
} from '../../actionTypes';

export const closePanel = (): ReducerAction => ({
  type: PANEL_CLOSE,
});

export const setPanelContent = (panelContent: JSX.Element): ReducerAction => ({
  type: PANEL_SET_CONTENT,
  payload: { panelContent },
});

export const removePanelContent = (): ReducerAction => ({
  type: PANEL_REMOVE_CONTENT,
});
