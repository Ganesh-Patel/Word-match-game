export const getConnectedGroups = (itemCount, groupSize) => {
    const allItems = [];
    const itemGroups = [];
  
    // Create all items
    for (let i = 1; i <= itemCount; i++) {
      allItems.push(`Item ${i}`);
    }
  
    // Group items into itemGroups with each group as an object containing the 'items' key
    for (let i = 0; i < allItems.length; i += groupSize) {
      itemGroups.push({ items: allItems.slice(i, i + groupSize) });
    }
  
    return [itemGroups, allItems];
  };
  

export const areItemsFromSingleGroup = (itemGroups, selectedItems) => {
    const firstItem = selectedItems[0];
  
    // Find the group that contains the first item
    const firstItemGroup = itemGroups.find(group => group.includes(firstItem));
  
    if (!firstItemGroup) {
      return false;  // If no group is found for the first item, return false
    }
  
    // Check if all selected items are from the same group as the first item
    return selectedItems.every(item => firstItemGroup.includes(item));
  };
  
  
  