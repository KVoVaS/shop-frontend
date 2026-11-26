import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { decrement, increment, removeItem } from '@/features/cart/cartSlice';
import { selectCartItems, selectCartTotal } from '@/features/cart/cartSelectors';
import { formatPrice } from '@/shared/lib/format';
import { QuantityStepper } from '@/components/QuantityStepper';

export function CartPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return <p>Корзина пуста. <Link to="/">Перейти в каталог</Link></p>;
  }

  return (
    <section>
      <h1>Корзина</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.productId} className="cart-row">
            <img src={item.image} alt={item.title} className="cart-row__image" />
            <Link to={`/product/${item.productId}`} className="cart-row__title">{item.title}</Link>
            <span>{formatPrice(item.price)}</span>
            <QuantityStepper
              value={item.quantity}
              onIncrement={() => dispatch(increment(item.productId))}
              onDecrement={() => dispatch(decrement(item.productId))}
            />
            <button className="btn btn--ghost" onClick={() => dispatch(removeItem(item.productId))}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        Итого: <strong data-testid="cart-total">{formatPrice(total)}</strong>
      </div>
      <Link className="btn" to="/checkout">Оформить заказ</Link>
    </section>
  );
}