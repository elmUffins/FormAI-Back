import Router from 'express';
import usuariosController from '../controllers/usuarios.controllers.js';

const router = Router();

// Define routes
router.post('/register', usuariosController.register);
router.post('/login', usuariosController.logIn);
router.get('/', usuariosController.getUsuarios);
router.get('/:id', usuariosController.getUsuario);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

export default router;