import express from "express";

const app = express();
const port = 3000;

import usuariosRouter from './routers/usuarios_r.js';
import ejerciciosRouter from './routers/ejercicios_r.js';

import "dotenv/config";
const cloudinary = require("cloudinary").v2;

app.use(express.json());

app.get("/", (_, res) => {
    res.send("1");
});

// Uso de los routers
app.use("/usuarios", usuariosRouter);
app.use("/ejercicios", ejerciciosRouter);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET
});

const file = "pe"

const uploader = async (_, res) => {
    try {
        const result = await cloudinary.uploader.upload(pe, {
            resource_type: "video"
        });
        return res.json(result.secure_url)
    } catch (error) {
        return res.json(error);
    }
    

};

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});