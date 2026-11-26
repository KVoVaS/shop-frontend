import { baseApi } from '@/services/baseApi';
import type { Order, OrderPayload } from '@/shared/types';

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<Order, OrderPayload>({
      query: (body) => ({ url: '/orders', method: 'POST', body }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    getMyOrders: build.query<Order[], void>({
      query: () => '/orders/my',
      providesTags: [{ type: 'Order', id: 'LIST' }],
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery } = ordersApi;