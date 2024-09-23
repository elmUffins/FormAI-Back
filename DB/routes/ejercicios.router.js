import Router from 'express';
import ejercicios from '../controllers/ejercicios.controller.js';

const router = Router();

// Define routes
router.get('/', ejercicios.getEjercicios);
router.get('/:id', ejercicios.getEjercicio);
router.post('/', ejercicios.createEjercicio);
router.put('/:id', ejercicios.updateEjercicio);
router.delete('/:id', ejercicios.deleteEjercicio);

export default router;