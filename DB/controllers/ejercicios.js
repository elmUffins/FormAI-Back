import {client} from "../db.js";

const getEjercicio = async (_, res) => {

    const rows = await client.query('SELECT * FROM alumnos');
    res.json(rows);
    }

const getEjercicios = async (req, res) => {

    const id = req.params.id
    const rows = await conn.query("SELECT * FROM artistas WHERE id = $1", [id])
    res.json(rows[0])
}

const createEjercicio = async (req, res) => {

    const user = req.body
    const email = req.body
    const contraseña = req.body
    await conn.query("INSERT INTO usuarios (user, email, contraseña ) VALUES ($1)", [user], [email], [contraseña])
    res.json(user)
};

const updateEjercicio = async (req, res) => {

    const nombre = req.body
    const id = req.params.id
    await conn.query("UPDATE artistas SET nombre = ? WHERE id = $1", [nombre, id])

    res.json(nombre)
};

const deleteEjercicio = async (req, res) => {

    const id = req.params.id
    await conn.query("DELETE FROM artistas WHERE id = $1", [id])
    res.json(id)
};

const ejercicio = {
    getEjercicio,
    getEjercicios,
    createEjercicio,
    updateEjercicio,
    deleteEjercicio
};

export default ejercicio;