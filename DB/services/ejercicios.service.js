import { client } from "../db.js";

const getEjercicios = async () => {
    const { rows } = await client.query('SELECT * FROM ejercicios');
    return rows;
};

const getEjercicioById = async (id) => {
    const { rows } = await client.query("SELECT * FROM ejercicios WHERE id = $1", [id]);
    return rows[0];
};

const createEjercicio = async (nombre) => {
    const { rows } = await client.query(
        "INSERT INTO ejercicios (nombre) VALUES ($1)",
        [nombre]
    );
    return rows[0];
};

const updateEjercicio = async (id, nombre) => {
    const { rows } = await client.query(
        "UPDATE ejercicios SET nombre = $1 WHERE id = $2",
        [nombre, id]
    );
    return rows[0];
};

const deleteEjercicio = async (id) => {
    await client.query("DELETE FROM ejercicios WHERE id = $1", [id]);
    return id;
};

export default {
    getEjercicios,
    getEjercicioById,
    createEjercicio,
    updateEjercicio,
    deleteEjercicio
};