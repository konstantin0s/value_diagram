import { LinkShiftingTool } from './linkShiftTool';
import * as go from 'gojs';
/**

 * Initializes a diagram with nodes and links templates.
 * This function sets up a diagram with customizable node and link templates
 *  including context menus for nodes and links.
 * It allows for increasing the font size of node text and decreasing the font size
 *  of link text upon interaction.
 *
 *
 * @returns {go.Diagram} The initialized diagram.
 */
export const initDiagram = (): go.Diagram => {
  /* 
  https://gojs.net/latest/intro/buildingObjects.html
  The setup const $ = go.GraphObject.make in GoJS is used to simplify and streamline the creation of GoJS diagram objects. This shorthand notation makes the code more concise and readable. Instead of repeatedly typing go.GraphObject.make, you can use the $ symbol to create various GoJS objects like diagrams, nodes, shapes, and panels.
  The use of $ as an abbreviation for go.GraphObject.make is so handy that if you see its use, you can assume it refers to go.GraphObject.make unless noted otherwise. Having the call to go.GraphObject.make be minimized into a single character helps remove clutter from the code and lets the indentation match the nesting of GraphObjects in the visual tree that is being constructed. The
 createNodeTemplate function returns a node template.
The node is auto-sized, resizable, linkable from all sides, and has a context menu.
It contains a Shape (circle) and a TextBlock (editable text).
Data bindings for Shape.fill and TextBlock.text are defined.
handleIncreaseFontSizeClick increases the font size of the node's text.
Finds the TextBlock within the node and doubles its font size.
createNodeContextMenu returns a context menu for nodes.
Contains a single item that triggers handleIncreaseFontSizeClick when clicked.
createLinkTemplate function returns a link template.
The link is reshapable, resegmentable, relinkable, and stretches between nodes.
Contains two shapes (one for the link line and one for the arrowhead) and a TextBlock.
Data bindings for link points and TextBlock.text are defined.
handleDecreaseFontSizeClick decreases the font size of the link's text.
Finds the TextBlock within the link and halves its font size.
createLinkContextMenu returns a context menu for links.
Contains a single item that triggers handleDecreaseFontSizeClick when clicked.
  */
  const $ = go.GraphObject.make;
  //Creates a new go.Diagram with an enabled undoManager, allowing undo and redo operations.
  const diagram = $(go.Diagram, {
    'undoManager.isEnabled': true,
  });
  diagram.toolManager.mouseDownTools.add($(LinkShiftingTool));
  /* Defines a function to create a node template, which is a reusable blueprint for nodes in the diagram.
  Creates a go.Node with:

Auto Layout: Automatically sizes and arranges the node.
Resizable: The node can be resized.
Linkable: The node can have links coming from and going to it.
Link Spots: Links can connect to any side of the node.
Context Menu: Adds a custom context menu created by createNodeContextMenu.
*/

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
      /* 
      Adds a go.Shape (a circle) to the node:
Attributes: Sets the shape's fill color, stroke width, linkability, and cursor type.
Binding: Binds the shape's fill color to the color property of the node data.

      */
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
      /* 
Adds a go.TextBlock to the node:
Attributes: Sets the text block's margin, editability, font, stroke color, name, and cursor type.
Binding: Binds the text block's text to the key property of the node data, allowing two-way binding.
      */
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
  /*
Defines a function to handle the click event for increasing the font size:

Get Node: Retrieves the node that was clicked.
Get Text Block: Finds the text block within the node.
Transaction: Starts a transaction to ensure atomic changes.
Increase Font Size: Doubles the current font size.
Commit Transaction: Commits the transaction to apply the changes
*/
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
  /*
Defines a function to create a context menu for nodes:

Adornment: Creates a vertical adornment panel.
Panel: Adds a panel with a rounded rectangle shape and a text block.
Text Block: The text block has a click event bound to handleIncreaseFontSizeClick.
*/
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
  /* 
Defines a function to create a link template, which is a reusable blueprint for links in the diagram.
Creates a go.Link with:
Attributes: Sets the link to be reshapable, resegmentable, and relinkable.
Adjusting: Adjusts the link stretching.
Context Menu: Adds a custom context menu created by createLinkContextMenu.
Binding: Binds the link points for two-way data binding.
Shapes: Adds a shape for the link and an arrow shape at the end.
Text Block: Adds a text block with specific attributes and two-way binding for the link text.
*/
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
      /* 
      he GraphObject.segmentOrientation property controls the angle of the label object relative to the angle of the link segment. There are several possible values that you can use. The default orientation is Orientation.None, meaning no rotation at all
      */
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
  /* 
An Adornment is a special kind of Part that is associated with another Part, the Adornment. adornedPart. Adornments are normally associated with a particular GraphObject in the adorned Part --
 that is the value of adornedObject. However, the adornedObject may be null, in which case the adornedPart will also be null.
 Get Link: Retrieves the link that was clicked.
Get Text Block: Finds the text block within the link.
Transaction: Starts a transaction to ensure atomic changes.
Decrease Font Size: Halves the current font size.
Commit Transaction: Commits the transaction to apply the changes.
*/
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
  /* 
Defines a function to create a context menu for links:

Adornment: Creates a vertical adornment panel.
Panel: Adds a panel with a rounded rectangle shape and a text block.
Text Block: The text block has a click event bound to handleDecreaseFontSizeClick.
*/
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
