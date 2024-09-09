import express from "express";
const app = express();
const port = 3000;

import usuarios from "./controllers/usuarios.js";
import ejercicios from "./controllers/ejercicios.js";

app.use(express.json());

app.get("/", (_, res) => {
    res.send("1");
});

// Usuarios
app.get("/usuarios", usuarios.getUsuarios);
app.get("/usuarios/:id", usuarios.getUsuario);
app.post("/usuarios", usuarios.createUsuario);
app.put("/usuarios/:id", usuarios.updateUsuario);
app.delete("/usuarios/:id", usuarios.deleteUsuario);

// Ejercicios
app.get("/ejercicios", ejercicios.getEjercicios);
app.get("/ejercicios/:id", ejercicios.getEjercicio);
app.post("/ejercicios", ejercicios.createEjercicio);
app.put("/ejercicios/:id", ejercicios.updateEjercicio);
app.delete("/ejercicios/:id", ejercicios.deleteEjercicio);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});