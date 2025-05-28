import mongoose from 'mongoose';
const motoSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  anio: { type: Number, required: true }, // Cambiado de 'año' a 'anio'
  color: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  imagenUrl: { type: String, required: true },
  almacen: { type: mongoose.Schema.Types.ObjectId, ref: 'Almacen' },
  proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' },
  disponible: { type: Boolean, default: true },
  creadoEn: { type: Date, default: Date.now }
});

const Moto = mongoose.model('Moto', motoSchema);
export default Moto;
