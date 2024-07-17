import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container, Option, DropdownContainer, DropdownHeader } from './styled';
import { useSelector } from 'react-redux';
import { selectedNodesSelector } from '../../containers/App/selectors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface DropdownProps {
  nodeDataArray: { key: string }[] | undefined;
  handleNodeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const BATCH_SIZE = 100; // Number of nodes to load per batch

/**
 * Dropdown component for selecting nodes with batch loading functionality.
 *
 * @param nodeDataArray - Array of nodes to display in the dropdown.
 * @param handleNodeSelect - Function to handle node selection.
 *
 * Functions:
 * - loadMoreNodes: Loads more nodes when scrolling to the bottom.
 * - loadPreviousNodes: Loads previous nodes when scrolling to the top.
 * - toggleOpen: Toggles the dropdown open state.
 * - handleOptionClick: Handles the click event on a dropdown option.
 * - handleScroll: Handles the scroll event to load more or previous nodes.
 */

export const Dropdown: FC<DropdownProps> = ({
  nodeDataArray,
  handleNodeSelect,
}) => {
  const selectedNode = useSelector(selectedNodesSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [displayedNodes, setDisplayedNodes] = useState<{ key: string }[]>([]);
  const [batchIndex, setBatchIndex] = useState(1);

  useEffect(() => {
    if (nodeDataArray && nodeDataArray.length > 0) {
      setDisplayedNodes(nodeDataArray.slice(0, BATCH_SIZE));
    }
  }, [nodeDataArray, selectedNode]);

  const loadMoreNodes = useCallback(() => {
    if (nodeDataArray && batchIndex * BATCH_SIZE < nodeDataArray.length) {
      setDisplayedNodes((prevNodes) => [
        ...prevNodes,
        ...nodeDataArray.slice(
          batchIndex * BATCH_SIZE,
          (batchIndex + 1) * BATCH_SIZE
        ),
      ]);
      setBatchIndex((prevIndex) => prevIndex + 1);
    }
  }, [batchIndex, nodeDataArray, selectedNode]);

  const loadPreviousNodes = useCallback(() => {
    if (nodeDataArray && batchIndex > 1) {
      const newBatchIndex = batchIndex - 1;
      setDisplayedNodes((prevNodes) => [
        ...nodeDataArray.slice(
          (newBatchIndex - 1) * BATCH_SIZE,
          newBatchIndex * BATCH_SIZE
        ),
        ...prevNodes,
      ]);
      setBatchIndex(newBatchIndex);
    }
  }, [batchIndex, nodeDataArray]);

  const toggleOpen = () => {
    setIsOpen(true);
  };

  const handleOptionClick = (key: string) => {
    handleNodeSelect({
      target: { value: key },
    } as React.ChangeEvent<HTMLSelectElement>);
    setIsOpen(false);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const top = event.currentTarget.scrollTop === 0;
    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight;

    if (bottom) {
      loadMoreNodes();
    }

    if (top) {
      loadPreviousNodes();
    }
  };

  return (
    <Container>
      <DropdownHeader onClick={toggleOpen}>
        <span>{selectedNode?.length > 0 ? selectedNode : 'Select node'}</span>
        <ArrowDropDownIcon />
      </DropdownHeader>
      {isOpen && (
        <DropdownContainer onScroll={handleScroll}>
          {displayedNodes?.map((node, index) => (
            <Option
              key={`${node?.key}-${index}`}
              onClick={() => handleOptionClick(node?.key)}
            >
              {node?.key}
            </Option>
          ))}
        </DropdownContainer>
      )}
    </Container>
  );
};
