import React, { useState, useEffect, useRef } from 'react';
import GridUI from './GridUI'; // Import GridUI component
import styles from './styles.module.scss';

const Game = ({ allItems, groupSize, columns, itemGroups, resetGame }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failureCount, setFailureCount] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [remainingItems, setRemainingItems] = useState(allItems);
  const gridUIRef = useRef(null); // Reference for GridUI

  const handleSelect = (item) => {
    if (selectedItems.includes(item)) return;

    const newSelection = [...selectedItems, item];
    setSelectedItems(newSelection);

    if (newSelection.length === groupSize) {
      setAttempts((prev) => prev + 1);
      const isMatch = itemGroups.some((group) =>
        group.every((word) => newSelection.includes(word))
      );

      if (isMatch) {
        setSuccessCount((prev) => prev + 1);
        setFeedback('success');
        setRemainingItems((prevItems) =>
          prevItems.filter((i) => !newSelection.includes(i))
        );
        setTimeout(() => {
          setSelectedItems([]);
          setFeedback(null);
        }, 1000);
      } else {
        setFailureCount((prev) => prev + 1);
        setFeedback('failure');
        setTimeout(() => {
          setSelectedItems([]);
          setFeedback(null);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (attempts > 0 && remainingItems.length === 0) {
      setFeedback('completed');
      setTimeout(() => {
        resetGame();
        setFeedback(null);
      }, 1000);

    }
  }, [remainingItems, attempts]);

  useEffect(() => {
    // Whenever allItems changes (like after configuration changes), reset the game
    setRemainingItems(allItems);
    setSelectedItems([]);
    setAttempts(0);
    setSuccessCount(0);
    setFailureCount(0);
    setFeedback(null);
  }, [allItems]);

  return (
    <div>
      <div className={styles.feedback}>
        <span>Attempts: {attempts}</span>
        <span>Successes: {successCount}</span>
        <span>Failures: {failureCount}</span>
      </div>

      <div>
        <div
          className={styles.grid}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          <GridUI
            items={remainingItems}
            cols={columns}
            onSelection={handleSelect}  // Pass the item selection handler
            status={feedback}  // Set feedback status (success/failure)
            selectedItems={selectedItems}  // Pass selected items
            highlightedItems={selectedItems}  // Highlight selected items
            ref={gridUIRef}  // Use reference if needed
          />
        </div>
      </div>

      {feedback === 'completed' && (
        <div className={styles.completedMessage}>
          <h2>Game Completed!</h2>
          <p>
            You finished the game in {attempts} attempts with {successCount}{' '}
            successes and {failureCount} failures.
          </p>
        </div>
      )}
    </div>
  );
};

export default Game;
