import Router from 'express';
import videosController from '../controllers/videos.controller.js';
import auth from '../middleware/auth.js';

const router = Router();

// Define routes
router.get('/', auth.verifyToken, auth.verifyAdmin, videosController.getVideos);
router.get('/:id', auth.verifyToken, videosController.getVideo);
router.get('/usuario', auth.verifyToken, videosController.getVideosByUsuario);
router.post('/', auth.verifyToken, videosController.uploadVideo);
router.put('/:id', auth.verifyToken, videosController.deleteVideo);


export default router;

