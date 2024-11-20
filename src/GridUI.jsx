import React from 'react';
import styles from './styles.module.scss';

const GridUI = ({ items, cols, onSelection, status, selectedItems, highlightedItems }) => {
  return (
    <div
      className={styles.grid}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`,justifyContent:'center',placeContent:'center',marginLeft:'22%',maxWidth:'100%' }}
    >
  
      {items.map((item, index) => (
        <button
          key={index}
          className={`${styles.item} ${
            selectedItems.includes(item)
              ? status === 'success'
                ? styles.success
                : status === 'failure'
                ? styles.failure
                : styles.selected
              : ''
          }`}
          onClick={() => onSelection(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default GridUI;
