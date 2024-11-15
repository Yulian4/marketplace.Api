// src/database/productos.ts
import { Product } from "../models";

export const productosDB: Product[] = [
  {
    name: "arroz",
    description: "Blanco",
    price: 2100,
    status: "pending",
    user: "123456"
  },
  {
    name: "lenteja",
    description: "Blanco",
    price: 2100,
    status: "pending",
    user: "123456"
  },
  {
    name: "banano",
    description: "Amarillo",
    price: 2100,
    status: "approved",
    user: "123456"
  }
];