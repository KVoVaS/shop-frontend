import { Link } from 'react-router-dom';
import type { Product } from '@/shared/types';
import { formatPrice } from '@/shared/lib/format';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCart } from '@/features/cart/cartSlice';
import { selectFavorites, toggleFavorite } from '@/features/favorites/favoritesSlice';

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const isFavorite = favorites.includes(product.id);

  return (
    <article className="card">
      <Link to={`/product/${product.id}`}>
        <img className="card__image" src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="card__body">
        <Link to={`/product/${product.id}`} className="card__title">{product.title}</Link>
        <div className="card__meta">★ {product.rating} · {product.category}</div>
        <div className="card__price">{formatPrice(product.price)}</div>
        <div className="card__actions">
          <button className="btn" onClick={() => dispatch(addToCart(product))}>
            В корзину
          </button>
          <button
            className={isFavorite ? 'btn btn--active' : 'btn btn--ghost'}
            aria-pressed={isFavorite}
            onClick={() => dispatch(toggleFavorite(product.id))}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </article>
  );
}