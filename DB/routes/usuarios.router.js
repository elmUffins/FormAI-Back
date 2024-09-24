import Router from 'express';
import usuariosController from '../controllers/usuarios.controllers.js';
import auth from '../middleware/auth.js';

const router = Router();

// Define routes
router.post('/register', usuariosController.register);
router.post('/login', usuariosController.logIn);
router.get('/', auth.verifyToken, auth.verifyAdmin, usuariosController.getUsuarios);
router.get('/:id', auth.verifyToken, auth.verifyAdmin, usuariosController.getUsuario);
router.post('/', auth.verifyToken, auth.verifyAdmin, usuariosController.createUsuario);
router.put('/:id', auth.verifyToken, usuariosController.updateUsuario);
router.put('/:id/promote', auth.verifyToken, auth.verifyAdmin, usuariosController.promoteUsuario);
router.delete('/:id', auth.verifyToken, auth.verifyAdmin, usuariosController.deleteUsuario);

export default router;