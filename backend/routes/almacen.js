import express from 'express';
import almacenController from '../controllers/almacenController.js';

const router = express.Router();

router.get('/', almacenController.getAll);
router.get('/:id', almacenController.getOne);
router.post('/', almacenController.create);
router.put('/:id', almacenController.update);
router.delete('/:id', almacenController.delete);

export default router;
