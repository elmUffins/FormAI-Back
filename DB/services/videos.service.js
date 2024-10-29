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

        console.log(`Sending video URL to machine learning API at ${mlApiEndpoint}`);
        const mlResponse = await fetch(mlApiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ videoUrl: secureUrl })
        });

        if (!mlResponse.ok) {
            throw new Error("Failed to send video URL to machine learning API");
        }

        const mlResult = await mlResponse.json();
        console.log("Machine learning API response:", mlResult);

        const correcto = mlResult.correcto ? 1 : 0;
        const issue = mlResult.issue || null;

        console.log("Inserting video into database");
        const { rows } = await client.query(
            "INSERT INTO videos (url, correcto, id_usuario, id_ejercicio) VALUES ($1, $2, $3, $4) RETURNING *",
            [secureUrl, correcto, userId, exerciseId]
        );
        console.log("Video inserted into database", rows[0]);

        fs.unlink(file.path, (err) => {
            if (err) {
                console.error("Failed to delete local file:", err);
            } else {
                console.log("Local file deleted");
            }
        });

        if (correcto) {
            return { correcto: true };
        } else {
            return { correcto: false, issue: issue };
        }
    } catch (error) {
        console.error("Error uploading video:", error);
        throw error;
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