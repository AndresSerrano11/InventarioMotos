const express = require('express');
const router = express.Router();
const Moto = require('../models/Moto');

// Crear moto
router.post('/', async (req, res) => {
  try {
    const nuevaMoto = new Moto(req.body);
    await nuevaMoto.save();
    res.status(201).json(nuevaMoto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las motos
router.get('/', async (req, res) => {
  try {
    const motos = await Moto.find();
    res.json(motos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar moto
router.put('/:id', async (req, res) => {
  try {
    const moto = await Moto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(moto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar moto
router.delete('/:id', async (req, res) => {
  try {
    await Moto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Moto eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
