import Router from 'express';
import multer from 'multer';
import videosController from '../controllers/videos.controller.js';
import auth from '../middleware/auth.js';

const router = Router();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

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
router.post('/upload', auth.verifyToken, upload.single('video'), videosController.uploadVideo);
router.delete('/:id', auth.verifyToken, videosController.deleteVideo);

export default router;

