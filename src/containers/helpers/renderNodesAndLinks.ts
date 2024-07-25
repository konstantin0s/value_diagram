import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../App/slice';
import { getRandomColor } from './useDiagramHelpers';
import { NodeType, Link } from './types';

/* 
This code defines a custom React hook useNodeAndLinkSaving that dynamically generates and saves nodes 
and links for a diagram. It uses useEffect to initialize the node and link data
 arrays with random colors and dispatches actions to indicate the start and finish of the saving process.
 In the provided code snippet, the useNodeAndLinkSaving custom hook is utilizing the useState and useEffect hooks to manage state and side effects respectively. Here's how the hooks are being used in the code:

useState:
useState<NodeType[]>([]): This hook is used to declare state variables nodeDataArray and linkDataArray to store an array of NodeType and Link respectively. By using useState, the component can re-render when the state changes.
useEffect:
The useEffect hook is used to perform side effects in function components. In this case, it is used to generate random colors for nodes, dispatch actions to indicate the start and finish of the saving process, generate nodes and links, and update the state variables nodeDataArray and linkDataArray.
The empty dependency array [] as the second argument ensures that the effect runs only once after the initial render.

*/

const useNodeAndLinkSaving = () => {
  const dispatch = useDispatch();

  const [nodeDataArray, setNodeDataArray] = useState<NodeType[]>([]);
  const [linkDataArray, setLinkDataArray] = useState<Link[]>([]);

  useEffect(() => {
    // generate random colors for nodes.
    const randomColor = getRandomColor();
    //Dispatch actions.startSaving() to indicate the start of the saving process.
    dispatch(actions.startSaving());

    const nodes: NodeType[] = [];
    const links: Link[] = [];
    //Generate 10,000 nodes with random colors and 5,000 links.
    for (let i = 0; i < 10000; i++) {
      nodes.push({ key: `Node ${i + 1}`, color: randomColor() });
    }
    for (let i = 0; i < 5000; i++) {
      links.push({
        from: `Node ${i + 1}`,
        to: `Node ${i + 5001}`,
        text: `Link ${i + 1}`,
      });
    }
    setNodeDataArray(nodes);
    setLinkDataArray(links);
    if (nodeDataArray?.length && linkDataArray?.length) {
      dispatch(actions.finishSaving());
    }
  }, []);

  return { nodeDataArray, linkDataArray };
};

export default useNodeAndLinkSaving;
