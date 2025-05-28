import proveedorController from '../controllers/proveedorController.js';
import express from 'express';

const router = express.Router();

router.get('/', proveedorController.getAll);
router.get('/:id', proveedorController.getOne);
router.post('/', proveedorController.create);
router.put('/:id', proveedorController.update);
router.delete('/:id', proveedorController.delete);

export default router;