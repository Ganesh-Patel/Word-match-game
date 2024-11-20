import React from 'react';
import styles from './styles.module.scss';

const GridUI = React.forwardRef(({ items, cols, onSelection, status, selectedItems, highlightedItems }, ref) => {
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
      {items.map((item, index) => {
        const isSelected = selectedItems.includes(item);
        const isHighlighted = highlightedItems.includes(item);
        const itemStatusClass = isSelected
          ? styles.selected
          : isHighlighted
          ? styles.highlighted
          : '';
        return (
          <div
            key={index}
            className={`${styles.item} ${itemStatusClass}`}
            onClick={() => onSelection(item)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
});

export default GridUI;
