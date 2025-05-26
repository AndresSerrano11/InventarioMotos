const mongoose = require('mongoose');

const motoSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  año: Number,
  color: String,
  precio: Number,
  stock: Number
});

module.exports = mongoose.model('Moto', motoSchema);
