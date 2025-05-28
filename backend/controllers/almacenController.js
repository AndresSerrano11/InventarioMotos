import Almacen from '../models/almacen.js';

const almacenController = {
  getAll: async (req, res) => {
    const almacenes = await Almacen.find();
    res.json(almacenes);
  },

  getOne: async (req, res) => {
    const almacen = await Almacen.findById(req.params.id);
    res.json(almacen);
  },

  create: async (req, res) => {
    const nuevo = new Almacen(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  },

  update: async (req, res) => {
    const actualizado = await Almacen.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  },

  delete: async (req, res) => {
    await Almacen.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Almacen eliminado' });
  }
};

export default almacenController;