import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/features/auth/authApi';

export function LoginPage() {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/orders';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate(from, { replace: true });
    } catch {
      /* ошибка ниже */
    }
  };

  return (
    <section>
      <h1>Вход</h1>
      <form className="form" onSubmit={onSubmit}>
        <label>Email<input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Пароль<input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {error && <p className="error">Неверный email или пароль</p>}
        <button className="btn" disabled={isLoading} type="submit">{isLoading ? 'Вход…' : 'Войти'}</button>
      </form>
      <p className="hint">Демо-режим: подойдёт любой email и непустой пароль.</p>
    </section>
  );
}