import { useGetMyOrdersQuery } from '@/features/orders/ordersApi';
import { formatPrice } from '@/shared/lib/format';

export function OrdersPage() {
  const { data, isLoading, isError } = useGetMyOrdersQuery();

  if (isLoading) return <p>Загрузка…</p>;
  if (isError) return <p>Не удалось загрузить заказы</p>;
  if (!data || data.length === 0) return <p>Заказов пока нет.</p>;

  return (
    <section>
      <h1>Мои заказы</h1>
      {data.map((order) => (
        <article key={order.id} className="order">
          <header>
            <strong>Заказ {order.id}</strong> · {new Date(order.createdAt).toLocaleString('ru-RU')} · {order.status}
          </header>
          <ul>
            {order.items.map((i) => (
              <li key={i.productId}>{i.title} × {i.quantity} — {formatPrice(i.price * i.quantity)}</li>
            ))}
          </ul>
          <div>Итого: <strong>{formatPrice(order.total)}</strong></div>
        </article>
      ))}
    </section>
  );
}