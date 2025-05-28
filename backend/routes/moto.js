import motoController from '../controllers/motoController.js';
import express from 'express'; 

const router = express.Router();

router.get('/', motoController.getAll);
router.get('/:id', motoController.getOne);
router.post('/', motoController.create);
router.put('/:id', motoController.update);
router.delete('/:id', motoController.delete);

export default router;

