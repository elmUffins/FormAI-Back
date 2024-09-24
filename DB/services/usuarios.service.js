import { client } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (usuario, email, pass) => {
    const checkUser = await client.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
    if (checkUser.rows.length) {
        throw new Error("User already exists");
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        const newUser = await client.query(
            "INSERT INTO usuarios (usuario, email, pass) VALUES ($1, $2, $3) RETURNING id",
            [usuario, email, hashedPassword]
        );
        const token = jwt.sign({ id: newUser.rows[0].id }, "tra", { expiresIn: "1h" });
        return { message: "User registered successfully", token };
    }
};

const logInUser = async (usuario, pass) => {
    const checkUser = await client.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
    if (!checkUser.rows.length) {
        throw new Error("User not found");
    } else {
        const user = checkUser.rows[0];
        const isMatch = await bcrypt.compare(pass, user.pass);
        if (!isMatch) {
            throw new Error("Unauthorized");
        } else {
            const token = jwt.sign({ id: user.id }, "tra", { expiresIn: "1h" });
            return { message: "Login successful", token };
        }
    }
};

const getAllUsuarios = async () => {
    const { rows } = await client.query('SELECT * FROM usuarios');
    return rows;
};

const getUsuarioById = async (id) => {
    const { rows } = await client.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    return rows[0];
};

const createUsuario = async (usuario, email, pass) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    await client.query("INSERT INTO usuarios (usuario, email, pass) VALUES ($1, $2, $3)",
    [usuario, email, hashedPassword]);
    return { usuario, email, hashedPassword };
};

const updateUsuario = async (id, usuario, email, pass) => {
    await client.query("UPDATE usuarios SET usuario = $1, SET email = $2, SET pass = $3 WHERE id = $4",
    [usuario, email, pass, id]);
    return { usuario, email, pass, id };
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
    registerUser,
    logInUser,
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    promoteUsuario,
    deleteUsuario
};