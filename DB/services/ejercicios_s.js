import { client } from "../db.js";

const getAllEjercicios = async () => {
    const { rows } = await client.query('SELECT * FROM ejercicios');
    return rows;
};

const getEjercicioById = async (id) => {
    const { rows } = await client.query("SELECT * FROM ejercicios WHERE id = $1", [id]);
    return rows[0];
};

const createEjercicio = async (nombre, descripcion) => {
    const { rows } = await client.query(
        "INSERT INTO ejercicios (nombre, descripcion) VALUES ($1, $2)",
        [nombre, descripcion]
    );
    return rows[0];
};

const updateEjercicio = async (id, nombre, descripcion) => {
    const { rows } = await client.query(
        "UPDATE ejercicios SET nombre = $1, descripcion = $2 WHERE id = $3",
        [nombre, descripcion, id]
    );
    return rows[0];
};

const deleteEjercicio = async (id) => {
    await client.query("DELETE FROM ejercicios WHERE id = $1", [id]);
    return id;
};

export {
    getAllEjercicios,
    getEjercicioById,
    createEjercicio,
    updateEjercicio,
    deleteEjercicio
};