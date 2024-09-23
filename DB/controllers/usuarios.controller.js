import * as usuarioService from "../services/usuarios.service.js";

const register = async (req, res) => {
    const { usuario, email, pass } = req.body;

    if (!usuario || !email || !pass) {
        return res.status(400).json({ error: "Missing info, fella" });
    }

    try {
        await usuarioService.registerUser(usuario, email, pass);
        res.status(201).json("Success!");
    } catch (error) {
        return res.status(409).json({ error: error.message });
    }
};

const logIn = async (req, res) => {
    const { usuario, pass } = req.body;

    if (!usuario || !pass) {
        return res.status(400).json({ error: "Missing info, fella" });
    }

    try {
        await usuarioService.logInUser(usuario, pass);
        res.status(201).json("Success!")
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

const getUsuarios = async (_, res) => {
    try {
        const usuarios = await usuarioService.getAllUsuarios();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getUsuario = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await usuarioService.getUsuarioById(id);
        return res.json(usuario);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createUsuario = async (req, res) => {
    const { usuario, email, pass } = req.body;
    try {
        const newUser = await usuarioService.createUsuario(usuario, email, pass);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateUsuario = async (req, res) => {
    const { usuario } = req.body;
    const id = req.params.id;
    try {
        const updatedUser = await usuarioService.updateUsuario(id, usuario);
        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedId = await usuarioService.deleteUsuario(id);
        return res.json(deletedId);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const usuarios = {
    logIn,
    register,
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
};

export default usuarios;