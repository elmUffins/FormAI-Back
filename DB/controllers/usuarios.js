import { client } from "../db.js";

const getUsuarios = async (_, res) => {
    const { rows } = await client.query('SELECT * FROM usuarios')
    res.json(rows)
};

const getUsuario = async (req, res) => {
    const id = req.params.id
    const { rows } = await client.query("SELECT * FROM usuarios WHERE id = $1", [id])
    res.json(rows[0])
};

const createUsuario = async (req, res) => {
    const { usuario, email, pass } = req.body
    await client.query("INSERT INTO usuarios (usuario, email, pass) VALUES ($1, $2, $3)", [usuario, email, pass])
    res.json({ usuario, email, pass })
};

const updateUsuario = async (req, res) => {
    const { usuario } = req.body
    const id = req.params.id
    await client.query("UPDATE usuarios SET usuario = $1 WHERE id = $2", [usuario, id])
    res.json({ usuario, id })
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