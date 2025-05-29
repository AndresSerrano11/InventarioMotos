import mongoose from 'mongoose';

const VentaSchema = new mongoose.Schema({
  moto: { type: mongoose.Schema.Types.ObjectId, ref: 'Moto', required: true },
  comprador: { type: mongoose.Schema.Types.ObjectId, ref: 'Comprador', required: true },
  fecha: { type: Date, default: Date.now },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  total: { type: Number, required: true }
});

const Venta = mongoose.model('Venta', VentaSchema);
export default Venta;