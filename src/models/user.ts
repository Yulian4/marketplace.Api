export interface User {
  documento: string
  username: string;
  password: string;
  role: 'user' | 'admin';
}