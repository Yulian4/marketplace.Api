export interface Product {
   id: string;
    name: string;
    description: string;
    price: number;
    // status: 'Pendiente' | 'Aprobado';
    status: 'Pendiente' | 'Aprobado' | 'Rechazado' ;
    user: string; 
  }
  