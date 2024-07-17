import { createSlice } from '@reduxjs/toolkit';

export const REDUCER_NAME = 'app';
export const appSlice = createSlice({
  name: REDUCER_NAME,
  initialState: {
    status: 'saving',
    selectedNode: null,
  },
  reducers: {
    startSaving: (state: { status: string }) => {
      state.status = 'saving';
    },
    finishSaving: (state: { status: string }) => {
      state.status = 'saved';
    },
    saveSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
  },
});

const generatedActions = appSlice?.actions;

export const actions = {
  ...generatedActions,
};
export const { reducer, name: sliceKey } = appSlice;
