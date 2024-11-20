import React, { useState, useEffect, useRef } from 'react';
import GridUI from './GridUI';
import { areItemsFromSingleGroup } from './utils/helpers.js'; // Function to check if items are from the same group
import styles from './styles.module.scss';

const StatusOptions = {
  Success: 'success',
  Failure: 'failure',
};

function Game({ itemGroups, allItems, columns, groupSize }) {
  const [items, setItems] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [highlightedItems, setHighlightedItems] = useState([]);
  const gridUIRef = useRef(null);

  // Reset the game when items change
  useEffect(() => {
    setItems(allItems);
    setAttempts(0);
    setStatus(null);
    setSelectedItems([]);
    setHighlightedItems([]);
    gridUIRef.current?.clearSelection();
  }, [allItems]);

  // Action when a selection is made
  const onSelection = (selectedItem) => {
    // Select items only until the group size is reached
    if (selectedItems.length < groupSize) {
      setSelectedItems((prevSelected) => [...prevSelected, selectedItem]);
      gridUIRef.current?.highlightSelected(selectedItem);
    }

    // When the selection reaches the required group size
    if (selectedItems.length === groupSize - 1) {
      const newStatus = areItemsFromSingleGroup(itemGroups, [...selectedItems, selectedItem])
        ? StatusOptions.Success
        : StatusOptions.Failure;
      setStatus(newStatus);

      // After selection, check if they belong to the same group
      const timeoutId = setTimeout(() => unHighlight([...selectedItems, selectedItem], newStatus), 1000);

      // Increase attempts for every selection made
      setAttempts((prev) => prev + 1);

      return () => clearTimeout(timeoutId);
    }
  };

  // Remove the highlighted items and update the game status
  function unHighlight(itemsForRemoval, status) {
    if (status === StatusOptions.Success) {
      setItems((prevItems) => prevItems.filter((item) => !itemsForRemoval.includes(item)));
    } else {
      // If failure, highlight the items in red for 1 second
      setHighlightedItems(itemsForRemoval);
      setTimeout(() => {
        setHighlightedItems([]);
        setSelectedItems([]);
        gridUIRef.current?.clearSelection();
      }, 1000);
    }
    setStatus(null);
    setSelectedItems([]);
  }

  return (
    <>
      {items.length ? (
        <GridUI
          items={items}
          cols={columns}
          onSelection={onSelection}
          status={status}
          selectedItems={selectedItems}
          highlightedItems={highlightedItems}
          ref={gridUIRef}
        />
      ) : (
        <p className={styles.center}>Well done! Reset to play again.</p>
      )}

      <p className={styles.center}>
        Attempts: <strong>{attempts}</strong>
      </p>
    </>
  );
}

export default Game;
