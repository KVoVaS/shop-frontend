import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/app/store';

// В браузере и в jsdom window существует — получаем абсолютный URL,
// чтобы fetch не падал на относительном пути в тестах.
const baseUrl =
  typeof window !== 'undefined' ? `${window.location.origin}/api` : '/api';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Product', 'Order'],
  endpoints: () => ({}),
});