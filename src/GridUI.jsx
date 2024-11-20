import React from 'react';
import styles from './styles.module.scss';

const GridUI = React.forwardRef(({ items, cols, onSelection, status }, ref) => {
  const handleClick = (item) => {
    // Handle item selection
    onSelection([item]);
  };

  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${styles.gridItem} ${status === 'success' ? styles.success : status === 'failure' ? styles.failure : ''}`}
          onClick={() => handleClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
});

export default GridUI;
