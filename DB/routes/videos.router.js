import Router from 'express';
import multer from 'multer';
import videosController from '../controllers/videos.controller.js';
import auth from '../middleware/auth.js';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Define routes
router.get('/', auth.verifyToken, auth.verifyAdmin, videosController.getVideos);
router.get('/:id', auth.verifyToken, videosController.getVideo);
router.get('/usuario', auth.verifyToken, videosController.getVideosByUsuario);
router.post('/', auth.verifyToken, upload.single('video'), videosController.uploadVideo);
router.put('/:id', auth.verifyToken, videosController.deleteVideo);

export default router;

