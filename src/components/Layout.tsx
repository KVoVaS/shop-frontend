import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCartCount } from '@/features/cart/cartSelectors';
import { selectFavorites } from '@/features/favorites/favoritesSlice';
import { logout } from '@/features/auth/authSlice';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link nav-link--active' : 'nav-link';

export function Layout() {
  const count = useAppSelector(selectCartCount);
  const favorites = useAppSelector(selectFavorites);
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="logo">TechShop</NavLink>
        <nav className="nav">
          <NavLink to="/" className={linkClass} end>Каталог</NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Избранное ({favorites.length})
          </NavLink>
          <NavLink to="/cart" className={linkClass}>Корзина ({count})</NavLink>
          {token ? (
            <>
              <NavLink to="/orders" className={linkClass}>Заказы</NavLink>
              <button className="btn btn--ghost" onClick={() => { dispatch(logout()); navigate('/'); }}>
                Выйти
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>Войти</NavLink>
          )}
        </nav>
      </header>
      <main className="main"><Outlet /></main>
      <footer className="footer">Курсовой проект — интернет-магазин на React</footer>
    </div>
  );
}