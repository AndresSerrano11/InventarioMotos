import Moto from '../models/moto.js';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const BUCKET = process.env.AWS_BUCKET_NAME;

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
    try {
      let imagenUrl = '';
      if (req.file) {
        const params = {
          Bucket: BUCKET,
          Key: 'motos/' + Date.now() + '-' + req.file.originalname,
          Body: req.file.buffer,
          ContentType: req.file.mimetype
          // ACL: 'public-read'
        };
        const uploadResult = await s3.upload(params).promise();
        imagenUrl = uploadResult.Location;
      }

      const nuevaMoto = new Moto({
        ...req.body,
        imagenUrl
      });
      await nuevaMoto.save();
      res.status(201).json(nuevaMoto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      let imagenUrl = req.body.imagenUrl; // Por si no se sube nueva imagen
      if (req.file) {
        const params = {
          Bucket: BUCKET,
          Key: 'motos/' + Date.now() + '-' + req.file.originalname,
          Body: req.file.buffer,
          ContentType: req.file.mimetype
        };
        const uploadResult = await s3.upload(params).promise();
        imagenUrl = uploadResult.Location;
      }
      const motoActualizada = await Moto.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          imagenUrl
        },
        { new: true }
      );
      res.json(motoActualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
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