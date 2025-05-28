import mongoose from 'mongoose';

const EmpleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  rol: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String },
  fechaContratacion: { type: Date, default: Date.now },
  estaActivo: { type: Boolean, default: true }
});

const Empleado = mongoose.model('Empleado', EmpleadoSchema);
export default Empleado;