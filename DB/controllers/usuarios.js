import {client} from "../db.js";

const getUsuarios = async (_, res) => {

    const rows = await client.query('SELECT * FROM usuarios');
    res.json(rows);
    }

const getUsuario = async (req, res) => {

    const id = req.params.id
    const rows = await client.query("SELECT * FROM usuarios WHERE id = $1", [id])
    res.json(rows[0])
}

const createUsuario = async (req, res) => {

    const user = req.body
    const email = req.body
    const contraseña = req.body
    await client.query("INSERT INTO usuarios (user, email, contraseña ) VALUES ($1)", [user], [email], [contraseña])
    res.json(user)
};

const updateUsuario = async (req, res) => {

    const nombre = req.body
    const id = req.params.id
    await client.query("UPDATE usuarios SET nombre = ? WHERE id = $1", [nombre, id])

    res.json(nombre)
};

const deleteUsuario = async (req, res) => {

    const id = req.params.id
    await client.query("DELETE FROM usuarios WHERE id = $1", [id])
    res.json(id)
};

const usuarios = {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
};

export default usuarios;