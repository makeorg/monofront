import { ReducerAction } from '../../types';
import { PANEL_CLOSE, PANEL_OPEN, PANEL_REMOVE_CONTENT, PANEL_SET_CONTENT } from '../actionTypes';

export const openPanel = (): ReducerAction => ({
  type: PANEL_OPEN,
});

export const closePanel = (): ReducerAction => ({
  type: PANEL_CLOSE,
});

export const setPanelContent = (panelContent: any): ReducerAction => ({
  type: PANEL_SET_CONTENT,
  payload: { panelContent },
});

export const removePanelContent = (): ReducerAction => ({
  type: PANEL_REMOVE_CONTENT,
});
