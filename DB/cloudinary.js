import cloudinary from "cloudinary";
import multer from "multer";
import express from "express";

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploader = async (req, res) => {
    const file = req.file; // Multer stores the file in req.file
    try {
        const result = await cloudinary.uploader.upload_stream({ resource_type: "video" }, (error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.json({ url: result.secure_url });
        });

        // Stream the file to Cloudinary
        file.stream.pipe(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Route to handle file upload
app.post('/upload', upload.single('file'), uploader);

export default app;
