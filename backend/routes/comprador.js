import compradorController from '../controllers/compradorController.js';
import express from 'express';
const router = express.Router();

router.get('/', compradorController.getAll);
router.get('/:id', compradorController.getOne);
router.post('/', compradorController.create);
router.put('/:id', compradorController.update);
router.delete('/:id', compradorController.delete);

export default router;