import express from 'express';
import ventaController from '../controllers/ventaController.js';

const router = express.Router();

router.get('/', ventaController.getAll);
router.get('/:id', ventaController.getOne);
router.post('/', ventaController.create);
router.put('/:id', ventaController.update);
router.delete('/:id', ventaController.delete);

export default router;