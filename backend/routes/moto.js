import express from 'express';
import motoController from '../controllers/motoController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', motoController.getAll);
router.get('/:id', motoController.getOne);
router.post('/', upload.single('imagen'), motoController.create);
router.put('/:id', upload.single('imagen'), motoController.update);
router.delete('/:id', motoController.delete);

export default router;

