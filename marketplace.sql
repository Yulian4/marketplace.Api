-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS tiendaventas;

-- Crear la base de datos
CREATE DATABASE tiendaventas;

-- Usar la base de datos recién creada
USE tiendaventas;

-- Crear la tabla de usuarios
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Nueva columna id como clave primaria
  username VARCHAR(255) NOT NULL UNIQUE,       -- Nombre de usuario (único)
  password VARCHAR(255) NOT NULL,              -- Contraseña encriptada
  role ENUM('user', 'admin') DEFAULT 'user',  -- Rol del usuario
  documento VARCHAR(20) NOT NULL              -- Documento de identificación
);

-- Insertar usuarios
INSERT INTO users (username, password, role, documento) VALUES
('yuliana', '$2b$10$3vG7Htr7eRPc9B1QU0/Oo', 'user', '123456');

-- Crear la tabla de productos
CREATE TABLE products (
  id VARCHAR(36) PRIMARY KEY,          -- El ID será un UUID (de tipo VARCHAR)
  name VARCHAR(255) NOT NULL,          -- Nombre del producto
  description TEXT NOT NULL,           -- Descripción del producto
  price DECIMAL(10, 2) NOT NULL,       -- Precio del producto
  status ENUM('Pendiente', 'Aprobado', 'Rechazado') DEFAULT 'Pendiente',  -- Estado del producto
  user VARCHAR(255) NOT NULL,          -- Usuario que crea el producto
  image VARCHAR(255) NOT NULL,         -- Imagen asociada al producto
  FOREIGN KEY (user) REFERENCES users(username)  -- Relación con la tabla de usuarios
);

ALTER TABLE users
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE products
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;