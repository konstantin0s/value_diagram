import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../App/slice';
import { getRandomColor } from './useDiagramHelpers';
import { NodeType, Link } from './types';

const useNodeAndLinkSaving = () => {
  const dispatch = useDispatch();

  const [nodeDataArray, setNodeDataArray] = useState<NodeType[]>([]);
  const [linkDataArray, setLinkDataArray] = useState<Link[]>([]);

  useEffect(() => {
    const randomColor = getRandomColor();
    dispatch(actions.startSaving());
    const nodes: NodeType[] = [];
    const links: Link[] = [];
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
