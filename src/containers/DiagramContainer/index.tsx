import React, { useState, useRef, RefObject } from 'react';
import { ReactDiagram } from 'gojs-react';
import { useDispatch } from 'react-redux';

import { Dropdown } from '../../components/Dropdown';
import { useModelChange, useNodeSelect } from '../helpers/useDiagramHelpers';
import useNodeAndLinkSaving from '../helpers/renderNodesAndLinks';
import { initDiagram } from './diagramConfig';

// DiagramContainer. It integrates a diagram visualization using the ReactDiagram
//  component from the gojs-react library and a Dropdown component for node selection.

const diagramStyle = { width: '100%', height: '600px' };

export const DiagramContainer = () => {
  const dispatch = useDispatch();
  const diagramRef: RefObject<any> = useRef(null);
  const [shouldSkipDiagramUpdate, setShouldSkipDiagramUpdate] =
    useState<boolean>(false);

  const { nodeDataArray, linkDataArray } = useNodeAndLinkSaving();
  const handleModelChange = useModelChange(
    dispatch,
    setShouldSkipDiagramUpdate
  );
  const handleNodeSelect = useNodeSelect(diagramRef, dispatch);

  return (
    <div>
      <Dropdown
        nodeDataArray={nodeDataArray}
        handleNodeSelect={handleNodeSelect}
      />
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName='diagram-component'
        nodeDataArray={nodeDataArray}
        linkDataArray={linkDataArray}
        skipsDiagramUpdate={shouldSkipDiagramUpdate}
        onModelChange={handleModelChange}
        ref={diagramRef}
        style={diagramStyle}
      />
    </div>
  );
};
