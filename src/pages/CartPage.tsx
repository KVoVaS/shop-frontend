import { Link, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/features/products/productsApi';
import { formatPrice } from '@/shared/lib/format';
import { useAppDispatch } from '@/app/hooks';
import { addToCart } from '@/features/cart/cartSlice';

export function ProductPage() {
  const { id = '' } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id, { skip: !id });
  const dispatch = useAppDispatch();

  if (isLoading) return <p>Загрузка…</p>;
  if (isError || !data) return <p>Товар не найден. <Link to="/">В каталог</Link></p>;

  return (
    <section className="product">
      <img className="product__image" src={data.image} alt={data.title} />
      <div>
        <h1>{data.title}</h1>
        <p className="card__meta">★ {data.rating} · {data.category} · в наличии: {data.stock}</p>
        <p className="product__price">{formatPrice(data.price)}</p>
        <p>{data.description}</p>
        <button className="btn" onClick={() => dispatch(addToCart(data))}>В корзину</button>
      </div>
    </section>
  );
}