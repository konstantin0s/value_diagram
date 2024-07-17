import { createSelector } from 'reselect';
import { RootState } from '../../types';
import { appSlice } from './slice';
import { AppContainer } from './types';

export const domain = (state: RootState) => state.app ?? appSlice;

export const loadingStatusSelector = createSelector(
  domain,
  (app: AppContainer) => {
    return app.status ?? '';
  }
);

export const selectedNodesSelector = createSelector(
  domain,
  (app: AppContainer) => {
    return app.selectedNode ?? '';
  }
);
