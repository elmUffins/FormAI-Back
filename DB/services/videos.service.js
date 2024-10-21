import { client } from "../db.js";
import fs from "fs";
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

const uploadVideo = async (file, userId, exerciseId) => {
    try {
        console.log("Starting upload");
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "video"
        });
        console.log("Video uploaded:", result);
        const secureUrl = result.secure_url;

        console.log("Inserting video into database");
        const { rows } = await client.query(
            "INSERT INTO videos (url, correcto, id_usuario, id_ejercicio) VALUES ($1, $2, $3, $4) ",
            [secureUrl, "0", userId, exerciseId]
        );
        console.log("Video inserted into database", rows[0]);

        fs.unlink(file.path, (err) => {
            if (err) {
                console.error("Failed to delete local file:", err);
            } else {
                console.log("Local file deleted");
            }
        });

        console.log(rows[0]);
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