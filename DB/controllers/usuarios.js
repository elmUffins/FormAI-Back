import { client } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const logIn = async (req, res) => {
    const { usuario, pass } = req.body 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    try {
        const checkUser = await client.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario])
        if (!checkUser.rows.length)
        {
            return res.status(404).send("Not found")
        }
        else 
        {
            const isMatch = await bcrypt.compare(hashedPassword, checkUser.rows[0].pass);
            if (isMatch)
            {
                return res.status(200).send("Login successful");
            }
            else
            {
                return res.status(200).send("Wrong information");
            }
        }

    } 
    catch (error)
    {
        return res.status(500).json({ error: error.message });
    }
}

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    await client.query("INSERT INTO usuarios (usuario, email, pass) VALUES ($1, $2, $3)", 
    [usuario, email, hashedPassword])
    res.json({ usuario, email, hashedPassword })
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
    logIn,
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
};

export default usuarios;