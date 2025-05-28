import Moto from '../models/moto.js';

const motoController = {
  getAll: async (req, res) => {
    const motos = await Moto.find();
    res.json(motos);
  },

  getOne: async (req, res) => {
    const moto = await Moto.findById(req.params.id);
    if (!moto) {
      return res.status(404).json({ mensaje: 'Moto no encontrada' });
    }
    res.json(moto);
  },

  create: async (req, res) => {
    const nuevaMoto = new Moto(req.body);
    await nuevaMoto.save();
    res.status(201).json(nuevaMoto);
  },

  update: async (req, res) => {
    const motoActualizada = await Moto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!motoActualizada) {
      return res.status(404).json({ mensaje: 'Moto no encontrada' });
    }
    res.json(motoActualizada);
  },

  delete: async (req, res) => {
    const motoEliminada = await Moto.findByIdAndDelete(req.params.id);
    if (!motoEliminada) {
      return res.status(404).json({ mensaje: 'Moto no encontrada' });
    }
    res.json({ mensaje: 'Moto eliminada' });
  }
};

export default motoController;