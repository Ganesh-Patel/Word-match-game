export const getConnectedGroups = (itemCount, groupSize) => {
    const allItems = [];
    const itemGroups = [];
    for (let i = 1; i <= itemCount; i++) {
      allItems.push(`Item ${i}`);
    }
  
    for (let i = 0; i < allItems.length; i += groupSize) {
      itemGroups.push(allItems.slice(i, i + groupSize));
    }
  
    return [itemGroups, allItems];
  };
  
  export const areItemsFromSingleGroup = (groups, selected) => {
    return groups.some((group) => selected.every((item) => group.includes(item)));
  };
  