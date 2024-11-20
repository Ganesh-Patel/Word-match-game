import React, { useState, useEffect, useCallback } from 'react';
import { Leva, useControls } from 'leva';
import Game from './Game';
import { getConnectedGroups } from './utils/helpers';
import styles from './styles.module.scss';

// Function to determine if the screen is small or not
const isSmallScreen = window.innerWidth <= 768;

const App = () => {
  // Configurable settings using Leva
  const { groupSize } = useControls({ groupSize: { value: 2, min: 2, max: 4, step: 1 } });
  const { itemCount } = useControls({ itemCount: { value: 8, min: 4, max: 12, step: 1 } });
  const { columns } = useControls({
    columns: { value: 4, min: 2, max: 4, step: 1, disabled: isSmallScreen },
  });

  // States for storing game data
  const [itemGroups, setItemGroups] = useState([]);
  const [allItems, setAllItems] = useState([]);

  // Function to reset the game and reinitialize items
  const resetGame = useCallback(() => {
    const [newItemGroups, newAllItems] = getConnectedGroups(itemCount, groupSize);
    setItemGroups(newItemGroups);
    setAllItems(newAllItems);
  }, [itemCount, groupSize]);

  // Effect to reset the game whenever settings change
  useEffect(resetGame, [itemCount, groupSize, resetGame]);

  return (
    <>
      <Leva
        collapsed
        hideCopyButton
        titleBar={{ position: { x: 0, y: 40 }, filter: false, title: 'Config' }}
        theme={{
          colors: {
            highlight1: 'white',
            highlight2: 'white',
          },
        }}
      />

      <h3 className={styles.center}>Match groups of {groupSize} words by clicking on related words</h3>
      <Game itemGroups={itemGroups} allItems={allItems} columns={columns} groupSize={groupSize} />
      <div className={styles.center}>
        <button className={styles.reset} onClick={resetGame}>
          Reset
        </button>
      </div>
    </>
  );
};

export default App;
