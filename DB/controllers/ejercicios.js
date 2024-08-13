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

    const user = req.body
    const email = req.body
    const contraseña = req.body
    await client.query("INSERT INTO ejercicios (user, email, contraseña ) VALUES ($1)", [user], [email], [contraseña])
    res.json(user)
};

const updateEjercicio = async (req, res) => {

    const nombre = req.body
    const id = req.params.id
    await client.query("UPDATE ejercicios SET nombre = ? WHERE id = $1", [nombre, id])

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