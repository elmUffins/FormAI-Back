import { client } from "../db.js";
import cloudinary from "../cloudinary.js"

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
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "video"
        });
        const secureUrl = result.secure_url;

        const { rows } = await client.query(
            "INSERT INTO videos (url) VALUES ($1) RETURNING *",
            [secureUrl]
        );
        return rows[0];
    } catch (error) {
        throw new Error("Video upload failed");
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