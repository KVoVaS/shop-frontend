import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearCart } from '@/features/cart/cartSlice';
import { selectCartItems, selectCartTotal } from '@/features/cart/cartSelectors';
import { useCreateOrderMutation } from '@/features/orders/ordersApi';
import { formatPrice } from '@/shared/lib/format';

type Form = { name: string; email: string; phone: string; address: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?\d[\d\s()-]{9,}$/;

export function CheckoutPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const [form, setForm] = useState<Form>({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState<Partial<Form>>({});

  const validate = (): boolean => {
    const next: Partial<Form> = {};
    if (form.name.trim().length < 2) next.name = 'Укажите имя';
    if (!EMAIL_RE.test(form.email)) next.email = 'Некорректный email';
    if (!PHONE_RE.test(form.phone)) next.phone = 'Некорректный телефон';
    if (form.address.trim().length < 5) next.address = 'Укажите адрес';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const update = (field: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createOrder({ customer: form, items, total }).unwrap();
      dispatch(clearCart());
      navigate('/orders');
    } catch {
      /* ошибка отображена ниже */
    }
  };

  if (items.length === 0) return <p>Корзина пуста — оформлять нечего.</p>;

  return (
    <section>
      <h1>Оформление заказа</h1>
      <form className="form" onSubmit={onSubmit} noValidate>
        <label>Имя<input className="input" value={form.name} onChange={update('name')} />{errors.name && <span className="error">{errors.name}</span>}</label>
        <label>Email<input className="input" value={form.email} onChange={update('email')} />{errors.email && <span className="error">{errors.email}</span>}</label>
        <label>Телефон<input className="input" value={form.phone} onChange={update('phone')} />{errors.phone && <span className="error">{errors.phone}</span>}</label>
        <label>Адрес<input className="input" value={form.address} onChange={update('address')} />{errors.address && <span className="error">{errors.address}</span>}</label>

        <div className="cart-total">К оплате: <strong>{formatPrice(total)}</strong></div>
        {error && <p className="error">Не удалось создать заказ. Попробуйте ещё раз.</p>}
        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Отправка…' : 'Подтвердить заказ'}
        </button>
      </form>
    </section>
  );
}