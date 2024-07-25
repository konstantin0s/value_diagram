import { ActionType } from 'typesafe-actions';
import { actions } from './slice';
import { RootState } from '../../types';

type AppContainer = LoadingState;

export type LoadingState = {
  status: 'saving' | 'saved';
  selectedNode: null | string;
};

type AppActions = ActionType<typeof actions>;

type ContainerState = AppContainer;
type ContainerActions = AppActions;

export type { AppContainer, ContainerActions, ContainerState, RootState };
