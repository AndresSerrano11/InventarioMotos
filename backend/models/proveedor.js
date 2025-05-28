
import mongoose from 'mongoose';
const ProveedorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactName: { type: String },
  phone: { type: String },
  email: { type: String },
  direccion: { type: String },
  motoSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Moto' }]
});

const Proveedor = mongoose.model('Proveedor', ProveedorSchema);
export default Proveedor;