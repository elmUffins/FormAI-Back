import usuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY;

const register = async (req, res) => {
    const { usuario, email, pass } = req.body;

    if (!usuario || !email || !pass) {
        return res.status(400).json({ message: "Missing fields" });
    }

    try {
        const testMail = await usuariosService.getUsuarioByEmail(email);
        if (testMail) {
            return res.status(400).json({message: "Email already in use"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        await usuariosService.createUsuario(usuario, email, hashedPassword);
        res.status(201).json({ message: "User registered succesfully" });

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Could not register user" });
        }
};

const login = async (req, res) => {
    const { email, pass } = req.body;

    if (!email || !pass) {
        return res.status(400).json({ message: "Missing fields" });
    }

    try {
        const usuario = await usuariosService.getUsuarioByEmail(email);
        if (!usuario) {
            return res.status(400).json({ message: "User not found" });
        }

        console.log("Retrieved user:", usuario);
        console.log("Retrieved password:", usuario.pass);

        const validPassword = await bcrypt.compare(pass, usuario.pass);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: usuario.id }, JWT_KEY, { expiresIn: '4h' });
        res.status(200).json({ id: usuario.id, token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};


const getUsuarios = async (_, res) => {
    try {
        const usuarios = await usuariosService.getAllUsuarios();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getUsuario = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json("An id is required")
    }

    try {
        const usuario = await usuariosService.getUsuarioById(id);
        return res.json(usuario);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createUsuario = async (req, res) => {
    const { usuario, email, pass } = req.body;

    if (!usuario || !email || !pass) {
        return res.status(400).json({ error: "Missing info, fella" });
    }

    try {
        const newUser = await usuariosService.createUsuario(usuario, email, pass);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateUsuario = async (req, res) => {
    const { usuario, email, pass } = req.body;
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: "Missing user ID" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    try {
        await usuariosService.updateUsuario(id, usuario, email, hashedPassword);
        return res.json(id, usuario, email);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const promoteUsuario = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: "An id is required" });
    }

    try {
        const newAdmin = await usuariosService.promoteUsuario(id);
        return res.json(newAdmin)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedId = await usuariosService.deleteUsuario(id);
        return res.json(deletedId);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default {
    login,
    register,
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    promoteUsuario,
    deleteUsuario
};
