import {client} from "../db.js";

const getEtapas = async (_, res) => {

    const rows = await client.query('SELECT * FROM ejercicios');
    res.json(rows);
    }

const getEtapa = async (req, res) => {

    const id = req.params.id
    const rows = await client.query("SELECT * FROM ejercicios WHERE id = $1", [id])
    res.json(rows[0])
}

const createEtapa = async (req, res) => {

    const user = req.body
    const email = req.body
    const contraseña = req.body
    await client.query("INSERT INTO ejercicios (user, email, contraseña ) VALUES ($1)", [user], [email], [contraseña])
    res.json(user)
};

const updateEtapa = async (req, res) => {

    const nombre = req.body
    const id = req.params.id
    await client.query("UPDATE ejercicios SET nombre = ? WHERE id = $1", [nombre, id])

    res.json(nombre)
};

const deleteEtapa = async (req, res) => {

    const id = req.params.id
    await client.query("DELETE FROM ejercicios WHERE id = $1", [id])
    res.json(id)
};

const etapas = {
    getEtapas,
    getEtapa,
    createEtapa,
    updateEtapa,
    deleteEtapa
};

export default etapas;