import Router from 'express';
import ejerciciosController from '../controllers/ejercicios.controller.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', ejerciciosController.getEjercicios);
router.get('/:id', ejerciciosController.getEjercicio);
router.post('/', auth.verifyToken, auth.verifyAdmin, ejerciciosController.createEjercicio);
router.put('/:id', auth.verifyToken, auth.verifyAdmin, ejerciciosController.updateEjercicio);
router.delete('/:id', auth.verifyToken, auth.verifyAdmin, ejerciciosController.deleteEjercicio);

export default router;