import mongoose from "mongoose";

const CompradorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String },
  telefono: { type: String },
  compras: [{
    moto: { type: mongoose.Schema.Types.ObjectId, ref: 'Moto' },
    fechaCompra: { type: Date, default: Date.now },
    precioPagado: { type: Number }
  }]
});

const Comprador = mongoose.model('Comprador', CompradorSchema);
export default Comprador;
