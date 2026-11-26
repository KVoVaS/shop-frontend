import { useEffect, useState } from 'react';
import { useGetProductsQuery } from '@/features/products/productsApi';
import { ProductCard } from '@/components/ProductCard';
import { useDebouncedValue } from '@/shared/lib/useDebouncedValue';

const CATEGORIES = ['Клавиатуры', 'Мыши', 'Мониторы', 'Наушники', 'Аксессуары'];
const LIMIT = 12;

export function CatalogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search, 400);

  useEffect(() => setPage(1), [debouncedSearch, category]);

  const { data, isLoading, isError } = useGetProductsQuery({
    search: debouncedSearch,
    category,
    page,
    limit: LIMIT,
  });

  const pages = data ? Math.max(1, Math.ceil(data.total / LIMIT)) : 1;

  return (
    <section>
      <h1>Каталог</h1>
      <div className="filters">
        <input
          className="input"
          placeholder="Поиск товара…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Все категории</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {isLoading && <p>Загрузка…</p>}
      {isError && <p>Не удалось загрузить каталог</p>}

      {data && data.items.length === 0 && <p>Ничего не найдено</p>}

      {data && data.items.length > 0 && (
        <>
          <div className="grid">
            {data.items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="pagination">
            <button className="btn btn--ghost" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Назад
            </button>
            <span>Страница {page} из {pages}</span>
            <button className="btn btn--ghost" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
              Вперёд
            </button>
          </div>
        </>
      )}
    </section>
  );
}