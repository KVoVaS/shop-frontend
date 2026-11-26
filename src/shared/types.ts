export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  stock: number;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductsQuery {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: 'created' | 'paid' | 'shipped';
}

export interface OrderPayload {
  customer: { name: string; email: string; phone: string; address: string };
  items: CartItem[];
  total: number;
}