import React, { useState, useEffect, useCallback } from 'react';
import { Leva, useControls } from 'leva';
import Game from './Game';
import { getConnectedGroups } from './utils/helpers';
import { connectedWords } from './data/data.js';
import styles from './styles.module.scss';

const isSmallScreen = window.innerWidth <= 768;

const App = () => {
  const { groupSize } = useControls({ groupSize: { value: 2, min: 2, max: 4, step: 1 } });
  const { itemCount } = useControls({ itemCount: { value: 8, min: 4, max: 12, step: 1 } });
  const { columns } = useControls({
    columns: { value: 4, min: 2, max: 4, step: 1, disabled: isSmallScreen },
  });

  const [itemGroups, setItemGroups] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const resetGame = useCallback(() => {
    const selectedGroups = connectedWords.get(groupSize);
    if (!selectedGroups) return; 
    const shuffledItems = selectedGroups
      .slice(0, itemCount)
      .map(group => [...group]) 
      .flat(); 
    shuffledItems.sort(() => Math.random() - 0.5);
    setItemGroups(shuffledItems);
    setAllItems(shuffledItems);
  }, [itemCount, groupSize]);

  useEffect(resetGame, [itemCount, groupSize, resetGame]);

  return (
    <>
      <Leva
        collapsed
        hideCopyButton
        titleBar={{ position: { x: 0, y: 40 }, filter: false, title: 'Config' }}
        theme={{
          colors: {
            highlight1: '#3498db',  
            highlight2: '#2ecc71',  
            background: '#2c3e50',  
            border: '#34495e',     
          },
        }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999, 
          width: '250px',  
          height: 'auto', 
        }}
      />

      <div style={{ marginTop: '80px' }}> {/* Add margin to avoid overlap with Leva panel */}
        <h3 className={styles.center}>Match groups of {groupSize} words by clicking on related words</h3>
        <Game itemGroups={itemGroups} allItems={allItems} columns={columns} groupSize={groupSize} />
        <div className={styles.center}>
          <button className={styles.reset} onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
