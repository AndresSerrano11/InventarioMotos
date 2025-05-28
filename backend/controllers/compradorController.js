import Comprador from '../models/comprador.js';

const compradorController = {
  getAll: async (req, res) => {
    const compradores = await Comprador.find();
    res.json(compradores);
  },

  getOne: async (req, res) => {
    const comprador = await Comprador.findById(req.params.id);
    if (!comprador) {
      return res.status(404).json({ mensaje: 'Comprador no encontrado' });
    }
    res.json(comprador);
  },

  create: async (req, res) => {
    const nuevo = new Comprador(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  },

  update: async (req, res) => {
    const actualizado = await Comprador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Comprador no encontrado' });
    }
    res.json(actualizado);
  },

  delete: async (req, res) => {
    const eliminado = await Comprador.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Comprador no encontrado' });
    }
    res.json({ mensaje: 'Comprador eliminado' });
  }
};

export default compradorController;