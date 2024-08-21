import {client} from "../db.js";

const getEtapas = async (_, res) => {

    const rows = await client.query('SELECT * FROM etapas');
    res.json(rows);
    }

const getEtapa = async (req, res) => {

    const id = req.params.id
    const rows = await client.query("SELECT * FROM etapas WHERE id = $1", [id])
    res.json(rows[0])
}

const createEtapa = async (req, res) => {

    const {nombre, descripcion, id_ejercicio} = req.body

    await client.query("INSERT INTO etapas (nombre, descripcion, id_ejercicio) VALUES ($1)",
    [nombre], [descripcion], [id_ejercicio])
    res.json({nombre, descripcion, id_ejercicio})
};

const updateEtapa = async (req, res) => {

    const nombre = req.body
    const id = req.params.id
    await client.query("UPDATE etapas SET nombre = $1 WHERE id = $2", [nombre, id])

    res.json(nombre)
};

const deleteEtapa = async (req, res) => {

    const id = req.params.id
    await client.query("DELETE FROM etapas WHERE id = $1", [id])
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