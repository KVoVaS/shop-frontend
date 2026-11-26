import type { Order, Product } from '@/shared/types';

const CATALOG: Array<[string, string]> = [
  ['Клавиатура механическая RGB', 'Клавиатуры'],
  ['Клавиатура беспроводная компактная', 'Клавиатуры'],
  ['Мышь игровая проводная', 'Мыши'],
  ['Мышь беспроводная эргономичная', 'Мыши'],
  ['Монитор 27" IPS', 'Мониторы'],
  ['Монитор 24" офисный', 'Мониторы'],
  ['Наушники накладные', 'Наушники'],
  ['Наушники TWS', 'Наушники'],
  ['Коврик для мыши XL', 'Аксессуары'],
  ['Подставка для ноутбука', 'Аксессуары'],
  ['Кабель USB-C 2 м', 'Аксессуары'],
  ['Хаб USB-C 7 в 1', 'Аксессуары'],
];

export const products: Product[] = Array.from({ length: 48 }, (_, i) => {
  const [title, category] = CATALOG[i % CATALOG.length];
  const variant = Math.floor(i / CATALOG.length) + 1;
  return {
    id: `p-${i + 1}`,
    title: `${title} (v${variant})`,
    price: 990 + ((i * 337) % 40) * 100,
    image: `https://picsum.photos/seed/p${i + 1}/400/300`,
    category,
    rating: Number((3.5 + ((i * 7) % 15) / 10).toFixed(1)),
    description:
      'Надёжное устройство для ежедневной работы и игр. Гарантия 12 месяцев, доставка по всей России.',
    stock: 5 + (i % 20),
  };
});

export const categories = [...new Set(CATALOG.map(([, c]) => c))];
export const orders: Order[] = [];