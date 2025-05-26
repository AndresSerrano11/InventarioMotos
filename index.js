require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend')));


app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI,).then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error de conexión:', err));

// Esquema y modelo de producto
const productoSchema = new mongoose.Schema({
  nombre: String,
  marca: String,
  precio: Number,
});

const Producto = mongoose.model('Producto', productoSchema);

// Rutas CRUD

app.get('/productos', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

app.post('/productos', async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.status(201).json({ mensaje: 'Producto agregado', producto: nuevo });
});

app.put('/productos/:id', async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // para devolver el objeto actualizado
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto actualizado', producto: productoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});


app.delete('/productos/:id', async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
