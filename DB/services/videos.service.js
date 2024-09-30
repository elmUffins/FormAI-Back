import { client } from "../db.js";
import cloudinary from "cloudinary";

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const getVideos = async () => {
    const { rows } = await client.query('SELECT * FROM videos');
    return rows;
};

const getVideoById = async (id) => {
    const { rows } = await client.query("SELECT * FROM videos WHERE id = $1", [id]);
    return rows[0];
};

const getVideosByUsuario = async (id_usuario) => {
    const { rows } = await client.query("SELECT * FROM videos WHERE id_usuario = $1", [id_usuario]);
    return rows;
}

const uploadVideo = async (file) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ resource_type: "video" }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
            file.stream.pipe(uploadStream);
        });

        const { secure_url } = result;
        const { rows } = await client.query("INSERT INTO videos (url) VALUES ($1)", [secure_url]);
        return rows[0];
    } catch (error) {
        throw new Error(`Failed to upload video: ${error.message}`);
    }
};

const deleteVideo = async (id) => {
    await client.query("DELETE FROM videos WHERE id = $1", [id]);
    return id;
};

export default {
    getVideos,
    getVideoById,
    getVideosByUsuario,
    uploadVideo,
    deleteVideo
};