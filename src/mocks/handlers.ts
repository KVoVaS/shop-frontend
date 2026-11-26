import { http, HttpResponse, delay } from 'msw';
import { orders, products } from './db';
import type { Order, OrderPayload } from '@/shared/types';

const authorized = (request: Request) =>
  request.headers.get('Authorization')?.startsWith('Bearer ');

export const handlers = [
  http.get('*/api/products', async ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const category = url.searchParams.get('category') ?? '';
    const page = Number(url.searchParams.get('page') ?? 1);
    const limit = Number(url.searchParams.get('limit') ?? 12);

    let items = products;
    if (search) items = items.filter((p) => p.title.toLowerCase().includes(search));
    if (category) items = items.filter((p) => p.category === category);

    const total = items.length;
    const start = (page - 1) * limit;
    await delay(200);
    return HttpResponse.json({ items: items.slice(start, start + limit), total, page, limit });
  }),

  http.get('*/api/products/:id', async ({ params }) => {
    const product = products.find((p) => p.id === String(params.id));
    return product
      ? HttpResponse.json(product)
      : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),

  http.post('*/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };
    if (!body.email || !body.password) {
      return HttpResponse.json({ message: 'Заполните все поля' }, { status: 400 });
    }
    await delay(200);
    return HttpResponse.json({
      token: 'mock-token',
      user: { id: 'u-1', email: body.email, name: body.email.split('@')[0] },
    });
  }),

  http.post('*/api/orders', async ({ request }) => {
    if (!authorized(request)) return new HttpResponse(null, { status: 401 });
    const body = (await request.json()) as OrderPayload;
    const order: Order = {
      id: `o-${orders.length + 1}`,
      items: body.items,
      total: body.total,
      createdAt: new Date().toISOString(),
      status: 'created',
    };
    orders.unshift(order);
    await delay(300);
    return HttpResponse.json(order, { status: 201 });
  }),

  http.get('*/api/orders/my', async ({ request }) => {
    if (!authorized(request)) return new HttpResponse(null, { status: 401 });
    return HttpResponse.json(orders);
  }),
];