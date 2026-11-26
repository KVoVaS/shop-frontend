import { describe, expect, it } from 'vitest';
import reducer, { addToCart, decrement, removeItem } from '@/features/cart/cartSlice';
import type { Product } from '@/shared/types';

const product: Product = {
  id: 'p-1', title: 'Клавиатура', price: 5000, image: '', category: 'Клавиатуры',
  rating: 4.5, description: '', stock: 10,
};

describe('cartSlice', () => {
  it('добавляет новый товар с количеством 1', () => {
    const state = reducer({ items: [] }, addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it('увеличивает количество существующего товара', () => {
    let state = reducer({ items: [] }, addToCart(product));
    state = reducer(state, addToCart(product));
    expect(state.items[0].quantity).toBe(2);
  });

  it('удаляет позицию при уменьшении количества до нуля', () => {
    const state = reducer({ items: [{ productId: 'p-1', title: 'К', price: 100, image: '', quantity: 1 }] }, decrement('p-1'));
    expect(state.items).toHaveLength(0);
  });

  it('удаляет позицию по идентификатору', () => {
    const state = reducer({ items: [{ productId: 'p-1', title: 'К', price: 100, image: '', quantity: 3 }] }, removeItem('p-1'));
    expect(state.items).toHaveLength(0);
  });
});