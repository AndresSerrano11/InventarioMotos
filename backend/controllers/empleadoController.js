import Empleado from '../models/empleado.js';

const empleadoController = {
  getAll: async (req, res) => {
    const empleados = await Empleado.find();
    res.json(empleados);
  },

  getOne: async (req, res) => {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.json(empleado);
  },

  create: async (req, res) => {
    const nuevo = new Empleado(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  },

  update: async (req, res) => {
    const actualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.json(actualizado);
  },

  delete: async (req, res) => {
    const eliminado = await Empleado.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.json({ mensaje: 'Empleado eliminado' });
  }
};

export default empleadoController;