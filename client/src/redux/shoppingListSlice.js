import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  items: [],
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      const { name, category } = action.payload;
      const existingItem = state.items.find(item => item.name === name && item.category === category);

      if (existingItem) {
        // If the item already exists, update its quantity
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist, add it to the list with quantity 1
        state.items.push({ name, category, quantity: 1 });
      }
    },
    resetItems: (state) => {
      state.items = [];
    },
  },
});

export const { setCategories, setItems, addItem, resetItems } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
