export interface Product {
   id: string;
    name: string;
    description: string;
    price: number;
    status: 'Pendiente' | 'Aprobado';
    user: string; 
  }
  