export interface Product {
    name: string;
    description: string;
    price: number;
    status: 'pending' | 'approved';
    user: string; // Username del usuario que agregó el producto
  }
  