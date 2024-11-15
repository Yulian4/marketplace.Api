"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // Importamos la aplicación de Express desde `app.ts`
const dotenv_1 = __importDefault(require("dotenv")); // Importamos dotenv para leer las variables de entorno
dotenv_1.default.config(); // Cargamos las variables de entorno desde el archivo `.env`
const port = process.env.PORT || 3000; // Usamos el puerto de las variables de entorno o 3000 por defecto
// Iniciamos el servidor de Express
app_1.default.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
