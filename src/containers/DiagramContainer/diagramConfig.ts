import { LinkShiftingTool } from './linkShiftTool';
import * as go from 'gojs';
/**
 * Initializes a diagram with nodes and links templates.
 *
 * @returns {go.Diagram} The initialized diagram.
 */
export const initDiagram = (): go.Diagram => {
  const $ = go.GraphObject.make;

  const diagram = $(go.Diagram, {
    'undoManager.isEnabled': true,
  });
  diagram.toolManager.mouseDownTools.add($(LinkShiftingTool));
  const createNodeTemplate = (): go.Node => {
    return $(
      go.Node,
      'Auto',
      {
        resizable: true,
        fromLinkable: true,
        toLinkable: true,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
        contextMenu: createNodeContextMenu(),
      },
      $(
        go.Shape,
        'Circle',
        {
          name: 'SHAPE',
          fill: 'white',
          strokeWidth: 2,
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer',
        },
        new go.Binding('fill', 'color')
      ),
      $(
        go.TextBlock,
        {
          margin: 8,
          editable: true,
          font: 'bold 14px sans-serif',
          stroke: 'black',
          name: 'TEXTBLOCK',
          cursor: 'pointer',
        },
        new go.Binding('text', 'key').makeTwoWay()
      )
    );
  };

  const handleIncreaseFontSizeClick = (_e: any, obj: any): void => {
    const node = obj.part.adornedPart;
    const textBlock = node.findObject('TEXTBLOCK');
    if (textBlock) {
      diagram.startTransaction('increase font size');
      const currentFontSize = parseInt(textBlock.font.split('px')[0], 10);
      const newFontSize = currentFontSize ? currentFontSize * 2 : 14 * 2;
      textBlock.font = `${newFontSize}px sans-serif`;
      diagram.commitTransaction('increase font size');
    }
  };

  const createNodeContextMenu = (): go.Adornment => {
    return $(
      go.Adornment,
      'Vertical',
      $(
        go.Panel,
        'Auto',
        $(go.Shape, 'RoundedRectangle', { fill: '#F8F8F8' }),

        $(go.TextBlock, 'increase font size', {
          click: handleIncreaseFontSizeClick,
        })
      )
    );
  };

  const createLinkTemplate = (): go.Link => {
    return $(
      go.Link,
      {
        reshapable: true,
        resegmentable: true,
        relinkableFrom: true,
        relinkableTo: true,
        adjusting: go.LinkAdjusting.Stretch,
        contextMenu: createLinkContextMenu(),
      },
      new go.Binding('points').makeTwoWay(),
      $(go.Shape),
      $(go.Shape, { toArrow: 'Standard' }),
      $(
        go.TextBlock,
        {
          segmentOffset: new go.Point(0, -10),
          segmentOrientation: go.Link.OrientAlong,
          name: 'TEXTBLOCK',
          font: 'bold 16px sans-serif',
          stroke: 'red',
          cursor: 'pointer',
        },
        new go.Binding('text', 'text').makeTwoWay()
      )
    );
  };

  const handleDecreaseFontSizeClick = (_e: any, obj: any): void => {
    const link = obj.part.adornedPart;
    const textBlock = link.findObject('TEXTBLOCK');
    if (textBlock) {
      diagram.startTransaction('decrease font size');
      const currentFontSize = parseInt(textBlock.font.split('px')[0], 10);
      const newFontSize = currentFontSize ? currentFontSize / 2 : 16 / 2;
      textBlock.font = `${newFontSize}px sans-serif`;
      diagram.commitTransaction('decrease font size');
    }
  };

  const createLinkContextMenu = (): go.Adornment => {
    return $(
      go.Adornment,
      'Vertical',
      $(
        go.Panel,
        'Auto',
        $(go.Shape, 'RoundedRectangle', { fill: '#F8F8F8' }),
        $(go.TextBlock, 'decrease font size', {
          click: handleDecreaseFontSizeClick,
        })
      )
    );
  };

  diagram.nodeTemplate = createNodeTemplate();
  diagram.linkTemplate = createLinkTemplate();

  return diagram;
};
