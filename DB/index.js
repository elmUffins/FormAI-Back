import express from "express";
import cors from "express";

const cors = cors();
const app = express();
const port = 3000;

import ejerciciosRouter from './routes/ejercicios.router.js';
import usuariosRouter from './routes/usuarios.router.js';
import videosRouter from './routes/videos.router.js';

import "dotenv/config";

app.use(express.json());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
  };
  
app.use(cors(corsOptions));

app.get("/", (_, res) => {
    res.send("1");
});

// Uso de los routers
app.use("/ejercicios", ejerciciosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/videos", videosRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

