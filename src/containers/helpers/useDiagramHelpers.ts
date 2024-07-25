import { SetStateAction } from 'react';
import { actions } from '../App/slice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

/* 
getRandomColor: This function generates a random color in hexadecimal format. It returns a function that, when called, generates a random color and returns it in the format '#RRGGBB'. The generated color is a random color code that can be used for styling elements in the UI.
*/
export const getRandomColor = () => {
  return () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  };
};

/* 
useModelChange: This function is a custom hook that is designed to handle model changes. It takes two parameters: dispatch and setSkipsDiagramUpdate. When invoked, it sets skipsDiagramUpdate to true, dispatches the startSaving action using the dispatch function, and then schedules the finishSaving action to be dispatched after a delay of 5000 milliseconds using setTimeout. This function is useful for managing state changes related to model updates.
*/
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

/*useNodeSelect: This function is another custom hook that is used for handling node selection in a diagram. It takes diagramRef and dispatch as parameters. When called, it expects an event (e) representing a change in a select element. It retrieves the selected node key from the event, finds the corresponding node in the diagram using the diagramRef, and then updates the selected node in the state by dispatching the saveSelectedNode action. Additionally, it selects the node in the diagram and centers the view on the selected node. This function is useful for managing interactions related to node selection in a diagram component.
These functions demonstrate how custom hooks can be used to encapsulate log
 */
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
