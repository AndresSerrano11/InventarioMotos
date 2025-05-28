import Proveedor from '../models/proveedor.js';

const proveedorController = {
  getAll: async (req, res) => {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  },

  getOne: async (req, res) => {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.json(proveedor);
  },

  create: async (req, res) => {
    const nuevo = new Proveedor(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  },

  update: async (req, res) => {
    const actualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.json(actualizado);
  },

  delete: async (req, res) => {
    const eliminado = await Proveedor.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.json({ mensaje: 'Proveedor eliminado' });
  }
};

export default proveedorController;