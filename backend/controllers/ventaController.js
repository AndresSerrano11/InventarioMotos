import Venta from '../models/venta.js';
import Moto from '../models/moto.js';

const ventaController = {
  getAll: async (req, res) => {
    const ventas = await Venta.find().populate('moto').populate('comprador');
    res.json(ventas);
  },
  getOne: async (req, res) => {
    const venta = await Venta.findById(req.params.id).populate('moto').populate('comprador');
    res.json(venta);
  },
  create: async (req, res) => {
    try {
      const { moto, cantidad } = req.body;
      // Busca la moto y verifica stock
      const motoDoc = await Moto.findById(moto);
      if (!motoDoc) return res.status(404).json({ error: 'Moto no encontrada' });
      if (motoDoc.stock < cantidad) {
        return res.status(400).json({ error: 'Stock insuficiente' });
      }
      // Resta el stock
      motoDoc.stock -= cantidad;
      await motoDoc.save();
      // Crea la venta
      const nuevaVenta = new Venta(req.body);
      await nuevaVenta.save();
      res.status(201).json(nuevaVenta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    const actualizada = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  },
  delete: async (req, res) => {
    await Venta.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Venta eliminada' });
  }
};

export default ventaController;