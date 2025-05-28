import config from './config.js';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import almacenRoutes from './routes/almacen.js';
import compradorRoutes from './routes/comprador.js';
import empleadoRoutes from './routes/empleado.js';
import motoRoutes from './routes/moto.js';
import proveedorRoutes from './routes/proveedor.js';
import conectarDB from './config.js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

dotenv.config();



conectarDB(); // Conectar a la base de datos

app.use(cors()); // Configuración de CORS


// Rutas principales
app.use('/almacenes', almacenRoutes);
app.use('/compradores', compradorRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/motos', motoRoutes);
app.use('/proveedores', proveedorRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('💥 Error inesperado:', err);
  res.status(500).json({ error: 'Algo salió mal. Intenta más tarde.' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
