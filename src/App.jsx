import React, { useState, useEffect, useCallback } from 'react';
import { Leva, useControls } from 'leva';
import { connectedWords } from './data/data.js';
import Game from './Game';
import styles from './styles.module.scss';

const App = () => {
  const isSmallScreen = window.innerWidth <= 768;

  // Leva configuration
  const { groupSize } = useControls({ groupSize: { value: 2, min: 2, max: 4, step: 1 } });
  const { itemCount } = useControls({ itemCount: { value: 8, min: 4, max: 12, step: 1 } });
  const { columns } = useControls({
    columns: { value: 2, min: 2, max: 4, step: 1, disabled: isSmallScreen },
  });

  const [allItems, setAllItems] = useState([]);
  const [itemGroups, setItemGroups] = useState([]);

  // Resets the game when group size or item count changes
  const resetGame = useCallback(() => {
    const groups = connectedWords.get(groupSize);
    if (!groups) return;

    // Shuffle and select a subset of groups for the game
    const shuffledGroups = [...groups].sort(() => 0.5 - Math.random());
    const selectedGroups = shuffledGroups.slice(0, itemCount);

    // Flatten and shuffle all items
    const flatItems = selectedGroups.flat();
    const shuffledItems = flatItems.sort(() => 0.5 - Math.random());

    setItemGroups(selectedGroups);
    setAllItems(shuffledItems);
  }, [groupSize, itemCount]);

  // Initial reset and reset on configuration change
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Connect group of {groupSize} words by clicking on related words</h1>
      <Leva collapsed />
      <button className={styles.resetButton} onClick={resetGame}>Reset Game</button>
      <Game
        allItems={allItems}
        groupSize={groupSize}
        columns={columns}
        itemGroups={itemGroups}
        resetGame={resetGame}
      />
    </div>
  );
};

export default App;
