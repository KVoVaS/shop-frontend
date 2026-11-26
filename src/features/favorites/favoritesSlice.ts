import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const FAVORITES_STORAGE_KEY = 'shop.favorites';

const load = (): string[] => {
  if (typeof localStorage === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? '[]') as string[];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: load() },
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const idx = state.items.indexOf(action.payload);
      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.push(action.payload);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (s: { favorites: { items: string[] } }) =>
  s.favorites.items;
export default favoritesSlice.reducer;