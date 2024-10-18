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
    const fields = [];
    const values = [];
    let query = "UPDATE usuarios SET ";

    if (usuario) {
        fields.push(`usuario = $${fields.length + 1}`);
        values.push(usuario);
    }
    if (email) {
        fields.push(`email = $${fields.length + 1}`);
        values.push(email);
    }
    if (pass) {
        fields.push(`pass = $${fields.length + 1}`);
        values.push(pass);
    }

    if (fields.length === 0) {
        throw new Error("No fields to update");
    }

    query += fields.join(", ");
    query += ` WHERE id = $${fields.length + 1}`;
    values.push(id);

    const { rows } = await client.query(query, values);
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
    getAllUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    createUsuario,
    updateUsuario,
    promoteUsuario,
    deleteUsuario
};