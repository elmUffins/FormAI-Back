import {client} from "../db.js";

const getEjercicios = async (_, res) => {

    const rows = await client.query('SELECT * FROM ejercicios');
    res.json(rows);
    }

const getEjercicio = async (req, res) => {

    const id = req.params.id
    const rows = await client.query("SELECT * FROM ejercicios WHERE id = $1", [id])
    res.json(rows[0])
}

const createEjercicio = async (req, res) => {

    const {nombre, descripcion, categoria} = req.body
 
    await client.query("INSERT INTO ejercicios (nombre, descripcion, categoria) VALUES ($1, $2, $3)", 
    [nombre], [descripcion], [categoria])
    res.json({nombre, descripcion, categoria})
};

const updateEjercicio = async (req, res) => {

    const nombre = req.body
    const id = req.params.id
    await client.query("UPDATE ejercicios SET nombre = $1 WHERE id = $2", [nombre, id])

    res.json(nombre)
};

const deleteEjercicio = async (req, res) => {

    const id = req.params.id
    await client.query("DELETE FROM ejercicios WHERE id = $1", [id])
    res.json(id)
};

const ejercicio = {
    getEjercicios,
    getEjercicio,
    createEjercicio,
    updateEjercicio,
    deleteEjercicio
};

export default ejercicio;