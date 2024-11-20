
export const fetchConnectedGroups = (groupSize, count) => {
    const groups = Array.from({ length: count }, (_, i) =>
      Array.from({ length: groupSize }, () => `Item-${i}-${Math.random().toFixed(2)}`)
    );
  
    const shuffledItems = groups.flat().sort(() => Math.random() - 0.5);
  
    return { groups, items: shuffledItems };
  };
  
  export const validateSelection = (groups, selectedItems) => {
    return groups.some((group) => selectedItems.every((item) => group.includes(item)));
  };
  