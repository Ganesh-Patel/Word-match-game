import React, { useState, useEffect, useRef } from 'react';
import GridUI from './GridUI';
import { areItemsFromSingleGroup } from './utils/helpers';
import styles from './styles.module.scss';

function Game({ itemGroups, allItems, columns, groupSize }) {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);  // Track selected items
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState(null);
  const gridUIRef = useRef(null);

  // Reset the game when items change
  useEffect(() => {
    setItems(allItems);
    setSelectedItems([]);
    setAttempts(0);
    setStatus(null);
    gridUIRef.current?.clearSelection();
  }, [allItems]);

  // Handle selection of words
  const onSelection = (selected) => {
    if (selected.length === groupSize) {
      setAttempts((prev) => prev + 1);
      const newStatus = areItemsFromSingleGroup(itemGroups, selected) ? 'success' : 'failure';
      setStatus(newStatus);

      if (newStatus === 'success') {
        const timeoutId = setTimeout(() => clearSelection(selected), 1000);
        return () => clearTimeout(timeoutId);
      } else {
        // Incorrect selection, reset after 1 second
        const timeoutId = setTimeout(() => resetSelection(), 1000);
        return () => clearTimeout(timeoutId);
      }
    }
  };

  // Reset the selection after incorrect match
  const resetSelection = () => {
    setSelectedItems([]);
    setStatus(null);
    gridUIRef.current?.clearSelection();
  };

  // Remove matched pairs from the list after success
  const clearSelection = (itemsForRemoval) => {
    setItems((prevItems) => prevItems.filter((item) => !itemsForRemoval.includes(item)));
    setStatus(null);
    setSelectedItems([]);
    gridUIRef.current?.clearSelection();
  };

  // Handle selection to highlight selected items
  const handleItemClick = (item) => {
    if (selectedItems.length < groupSize && !selectedItems.includes(item)) {
      setSelectedItems((prev) => [...prev, item]);
      gridUIRef.current?.highlightSelected(item);
    }
  };

  return (
    <>
      {items.length ? (
        <GridUI
          items={items}
          cols={columns}
          onSelection={onSelection}
          status={status}
          selectedItems={selectedItems}
          ref={gridUIRef}
          onItemClick={handleItemClick}
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
