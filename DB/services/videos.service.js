import { client } from "../db.js";

const getVideos = async () => {
    const { rows } = await client.query('SELECT * FROM videos');
    return rows;
};

const getVideoById = async (id) => {
    const { rows } = await client.query("SELECT * FROM videos WHERE id = $1", [id]);
    return rows[0];
};

const uploadVideo = async (nombre) => {
    const { rows } = await client.query(
        "INSERT INTO ejercicios (nombre) VALUES ($1)",
        [nombre]
    );
    return rows[0];
};

const deleteVideo = async (id) => {
    await client.query("DELETE FROM videos WHERE id = $1", [id]);
    return id;
};

export default {
    getVideos,
    getVideoById,
    uploadVideo,
    deleteVideo
};