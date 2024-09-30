import { client } from "../db.js";

const getAllUsuarios = async () => {
    const { rows } = await client.query('SELECT * FROM usuarios');
    return rows;
};

const getUsuarioById = async (id) => {
    const { rows } = await client.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    return rows[0];
};

const getUsuarioByEmail = async (email) => {
    const { rows } = await client.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    return rows[0];
};

const createUsuario = async (usuario, email, pass) => {
    const { rows } = await client.query("INSERT INTO usuarios (usuario, email, pass, admin) VALUES ($1, $2, $3, false)",
    [usuario, email, pass]);
    return rows[0];
};

const updateUsuario = async (id, usuario, email, pass) => {
    const { rows } = await client.query("UPDATE usuarios SET usuario = $1, SET email = $2, SET pass = $3 WHERE id = $4",
    [usuario, email, pass, id]);
    return rows[0];
};

const promoteUsuario = async (id) => {
    await client.query("UPDATE usuarios SET admin = true WHERE id = $1", [id]);
    return id;
};

const deleteUsuario = async (id) => {
    await client.query("DELETE FROM usuarios WHERE id = $1", [id]);
    return id;
};

export default {
    register,
    login,
    getAllUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    createUsuario,
    updateUsuario,
    promoteUsuario,
    deleteUsuario
};