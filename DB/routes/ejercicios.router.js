import Router from 'express';
import ejerciciosController from '../controllers/ejercicios.controller.js';

const router = Router();

// Define routes
router.get('/', ejerciciosController.getEjercicios);
router.get('/:id', ejerciciosController.getEjercicio);
router.post('/', ejerciciosController.createEjercicio);
router.put('/:id', ejerciciosController.updateEjercicio);
router.delete('/:id', ejerciciosController.deleteEjercicio);

export default router;