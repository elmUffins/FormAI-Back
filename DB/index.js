import express from "express";

const app = express();
const port = 3000;

import ejerciciosRouter from './routers/ejercicios.router.js';
import usuariosRouter from './routers/usuarios.router.js';
import videosRouter from './routers/videos.router.js';

import "dotenv/config";

app.use(express.json());
app.use(cors());

var corsOptions = {
    origin: 'http://localhost/3000',
    optionsSuccessStatus: 200
  }

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