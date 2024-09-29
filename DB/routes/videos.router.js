import Router from 'express';
import usuariosController from '../controllers/usuarios.controller.js';
import auth from '../middleware/auth.js';

const router = Router();

// Define routes
router.get('/', auth.verifyToken, auth.verifyAdmin, );
router.get('/:id', auth.verifyToken, auth.verifyAdmin, );
router.post('/', auth.verifyToken, auth.verifyAdmin, );
router.put('/:id', auth.verifyToken, );
router.put('/:id/promote', auth.verifyToken, auth.verifyAdmin, )
router.delete('/:id', auth.verifyToken, auth.verifyAdmin, );

export default router;

