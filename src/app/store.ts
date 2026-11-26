import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '@/services/baseApi';
import cartReducer, { CART_STORAGE_KEY } from '@/features/cart/cartSlice';
import favoritesReducer, { FAVORITES_STORAGE_KEY } from '@/features/favorites/favoritesSlice';
import authReducer from '@/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    auth: authReducer,
  },
  middleware: (gDM) => gDM().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

// Ручная синхронизация с localStorage — без redux-persist
let prevCart = store.getState().cart.items;
let prevFav = store.getState().favorites.items;
store.subscribe(() => {
  const state = store.getState();
  if (state.cart.items !== prevCart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart.items));
    prevCart = state.cart.items;
  }
  if (state.favorites.items !== prevFav) {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.favorites.items));
    prevFav = state.favorites.items;
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;