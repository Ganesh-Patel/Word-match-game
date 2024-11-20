import React from 'react';
import styles from './styles.module.scss';

const GridUI = React.forwardRef(({ items, cols, onSelection, status, selectedItems, onItemClick }, ref) => {
  const highlightSelected = (item) => {
    const itemElements = document.querySelectorAll(`.${styles.item}`);
    itemElements.forEach((el) => {
      if (el.textContent === item) {
        el.classList.add(styles.selected);
      } else {
        el.classList.remove(styles.selected);
      }
    });
  };

  // Make sure the selection UI highlights correctly
  React.useImperativeHandle(ref, () => ({
    highlightSelected,
    clearSelection: () => {
      const itemElements = document.querySelectorAll(`.${styles.item}`);
      itemElements.forEach((el) => el.classList.remove(styles.selected));
    },
  }));

  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${styles.item} ${selectedItems.includes(item) ? styles.selected : ''}`}
          onClick={() => onItemClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
});

export default GridUI;
