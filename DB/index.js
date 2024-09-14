import express from "express";
const app = express();
const port = 3000;

import usuariosRouter from './routers/usuarios_r.js';
import ejerciciosRouter from './routers/ejercicios_r.js';

app.use(express.json());

app.get("/", (_, res) => {
    res.send("1");
});

// Uso de los routers
app.use("/usuarios", usuariosRouter);
app.use("/ejercicios", ejerciciosRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});