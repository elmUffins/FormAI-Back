import ejerciciosService from "../services/ejercicios.service.js";

const getEjercicios = async (_, res) => {
    try {
        const ejercicios = await ejerciciosService.getEjercicios();
        return res.json(ejercicios);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getEjercicio = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "An id is required" });

    try {
        const ejercicio = await ejerciciosService.getEjercicioById(id);
        return res.json(ejercicio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createEjercicio = async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ message: "A name is required" });

    try {
        const newEjercicio = await ejerciciosService.createEjercicio(nombre);
        return res.status(201).json(newEjercicio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateEjercicio = async (req, res) => {
    const { nombre } = req.body;
    const id = req.params.id;
    if (!id || !nombre) return res.status(400).json({ message: "Missing fields" });

    try {
        const updatedEjercicio = await ejerciciosService.updateEjercicio(id, nombre);
        return res.json(updatedEjercicio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteEjercicio = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "An id is required" });
    
    try {
        const deletedId = await ejerciciosService.deleteEjercicio(id);
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

