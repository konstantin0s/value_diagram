import { SetStateAction } from 'react';
import { actions } from '../App/slice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

export const getRandomColor = () => {
  return () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  };
};

export const useModelChange = (
  dispatch: any,
  setSkipsDiagramUpdate: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  }
) => {
  return (e: any) => {
    setSkipsDiagramUpdate(true);
    dispatch(actions.startSaving());
    setTimeout(() => {
      dispatch(actions.finishSaving());
    }, 5000);
  };
};

export const useNodeSelect = (
  diagramRef: any,
  dispatch: Dispatch<UnknownAction>
) => {
  return (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const nodeKey = (e.target as HTMLSelectElement).value;
    const diagram = diagramRef.current.getDiagram();
    const node = diagram.findNodeForKey(nodeKey);
    if (node) {
      dispatch(actions.saveSelectedNode(nodeKey));
      diagram.select(node);
      diagram.centerRect(node.actualBounds);
    }
  };
};
