// src/dataBase.ts
import { User } from "../models";
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const usuariosDB: User[] = [
  {
    username: "yuliana",
    password: "yuliana123",
    role: "user",
    documento: "123456"
  },
  {
    username: "yuliana2",
    password: "yuliana1234",
    role: "admin",
    documento: "09876"
  },
  {
    username: "valentina",
    password: "valentina123",
    role: "admin",
    documento: "123457"
  }
];

usuariosDB.forEach(async (user) => {
  user.password = await bcrypt.hash(user.password, saltRounds);
});

