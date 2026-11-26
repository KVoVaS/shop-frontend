import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/features/cart/cartSlice';
import favoritesReducer from '@/features/favorites/favoritesSlice';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/shared/types';

const product: Product = {
  id: 'p-1', title: 'Клавиатура', price: 5000, image: '', category: 'Клавиатуры',
  rating: 4.5, description: '', stock: 10,
};

const renderWithStore = () => {
  const store = configureStore({
    reducer: { cart: cartReducer, favorites: favoritesReducer },
  });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    </Provider>,
  );
  return store;
};

describe('ProductCard', () => {
  it('добавляет товар в корзину по клику', async () => {
    const store = renderWithStore();
    await userEvent.click(screen.getByRole('button', { name: /в корзину/i }));
    expect(store.getState().cart.items[0]).toMatchObject({ productId: 'p-1', quantity: 1 });
  });

  it('переключает избранное', async () => {
    const store = renderWithStore();
    await userEvent.click(screen.getByRole('button', { name: '♡' }));
    expect(store.getState().favorites.items).toContain('p-1');
  });
});