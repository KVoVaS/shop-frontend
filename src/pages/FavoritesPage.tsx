import { useGetProductsQuery } from '@/features/products/productsApi';
import { ProductCard } from '@/components/ProductCard';
import { useAppSelector } from '@/app/hooks';
import { selectFavorites } from '@/features/favorites/favoritesSlice';

export function FavoritesPage() {
  const favorites = useAppSelector(selectFavorites);
  const { data, isLoading } = useGetProductsQuery({ limit: 100 });

  if (favorites.length === 0) return <p>В избранном пока пусто.</p>;
  if (isLoading || !data) return <p>Загрузка…</p>;

  const items = data.items.filter((p) => favorites.includes(p.id));
  return (
    <section>
      <h1>Избранное</h1>
      <div className="grid">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}