import mongoose from 'mongoose';

const AlmacenSchema = new mongoose.Schema({
  direccion: { type: String, required: true },
  capacidad: { type: Number, required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' },
  moto: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Moto' }]
});

const Almacen = mongoose.model('Almacen', AlmacenSchema);
export default Almacen;