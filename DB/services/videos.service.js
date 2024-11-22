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

const uploadVideo = async (videoBuffer, userId, exerciseId) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "video" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(videoBuffer);
        });

        console.log("Video uploaded:", result);

        const secureUrl = result.secure_url;

        let mlApiEndpoint;
        if (exerciseId === "1") {
            mlApiEndpoint = 'https://ml.formaitic.me/analyze/squat?video_url=' + secureUrl;
        } else if (exerciseId === "2") {
            mlApiEndpoint = 'https://ml.formaitic.me/analyze/plank?video_url=' + secureUrl;
        } else {
            throw new Error("Invalid exerciseId");
        }

        console.log(`Sending video URL to machine learning API at ${mlApiEndpoint}`);
        const mlResponse = await fetch(mlApiEndpoint, {
            method: 'GET',
        });

        if (!mlResponse.ok) {
            throw new Error("Failed to send video URL to machine learning API");
        }

        const mlResult = await mlResponse.json();
        console.log("Machine learning API response:", mlResult);

        const correct = mlResult.correct ? 1 : 0;
        const success = mlResult.success ? 1 : 0;

        console.log("Inserting video into database");
        const { rows } = await client.query(
            "INSERT INTO videos (url, correcto, id_usuario, id_ejercicio) VALUES ($1, $2, $3, $4) RETURNING *",
            [secureUrl, correcto, userId, exerciseId]
        );
        console.log("Video inserted into database", rows[0]);

        //fs.unlink(video.path, (err) => {
        //    if (err) {
        //        console.error("Failed to delete local file:", err);
        //    } else {
        //        console.log("Local file deleted");
        //    }
        //});

        if (success) {
            if (correct) {
                return { correct: true } 
            }
            else {
                return { correct: false }
            }
        } 
        else {
            return { success: false };
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