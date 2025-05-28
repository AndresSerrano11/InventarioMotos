import express from 'express';
import empleadoController from '../controllers/empleadoController.js';

const router = express.Router();

router.get('/', empleadoController.getAll);
router.get('/:id', empleadoController.getOne);
router.post('/', empleadoController.create);
router.put('/:id', empleadoController.update);
router.delete('/:id', empleadoController.delete);

export default router;
