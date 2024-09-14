import Router from 'express';
import usuarioService from '../controllers/usuarios.js';

const router = Router();

// Define routes
router.post('/register', usuarioService.register);
router.post('/login', usuarioService.logIn);
router.get('/', usuarioService.getUsuarios);
router.get('/:id', usuarioService.getUsuario);
router.post('/', usuarioService.createUsuario);
router.put('/:id', usuarioService.updateUsuario);
router.delete('/:id', usuarioService.deleteUsuario);

export default router;