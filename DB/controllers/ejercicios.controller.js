import ejercicioService from "../services/ejercicios.service.js";

const getEjercicios = async (_, res) => {
    try {
        const ejercicios = await ejercicioService.getEjercicios();
        return res.json(ejercicios);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getEjercicio = async (req, res) => {
    const id = req.params.id;
    try {
        const ejercicio = await ejercicioService.getEjercicioById(id);
        return res.json(ejercicio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createEjercicio = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const newEjercicio = await ejercicioService.createEjercicio(nombre, descripcion);
        return res.status(201).json(newEjercicio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateEjercicio = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const id = req.params.id;
    try {
        const updatedEjercicio = await ejercicioService.updateEjercicio(id, nombre, descripcion);
        return res.json(updatedEjercicio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteEjercicio = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedId = await ejercicioService.deleteEjercicio(id);
        return res.json(deletedId);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default {
    getEjercicios,
    getEjercicio,
    createEjercicio,
    updateEjercicio,
    deleteEjercicio
};

