export interface Product {
   id: string;
    name: string;
    description: string;
    price: number;
    // status: 'Pendiente' | 'Aprobado | 'Rechazo';
    status: 'Pendiente' | 'Aprobado' | 'Rechazado' ;
    user: string; 
    image: string;
  }
  