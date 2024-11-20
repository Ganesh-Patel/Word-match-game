import React, { useState, useEffect, useRef } from 'react';
import GridUI from './GridUI';
import { areItemsFromSingleGroup } from './utils/helpers';
import styles from './styles.module.scss';

function Game({ itemGroups, allItems, columns, groupSize }) {
  const [items, setItems] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState(null);
  const gridUIRef = useRef(null);

  // Reset the game when items change
  useEffect(() => {
    setItems(allItems);
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
      const timeoutId = setTimeout(() => clearSelection(selected, newStatus), 1000);
      return () => clearTimeout(timeoutId);
    }
  };

  // Clear the selection after a delay
  const clearSelection = (itemsForRemoval, status) => {
    if (status === 'success') {
      setItems(items.filter((item) => !itemsForRemoval.includes(item)));
    }
    setStatus(null);
    gridUIRef.current?.clearSelection();
  };

  return (
    <>
      {items.length ? (
        <GridUI items={items} cols={columns} onSelection={onSelection} status={status} ref={gridUIRef} />
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
