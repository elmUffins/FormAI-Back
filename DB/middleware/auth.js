import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado o formato incorrecto" });
    }
    
    // Del header, se asigna el token a la variable 'token', ignorando el 'Bearer'
    const token = authHeader.split(" ")[1];
    try {
        const verification = jwt.verify(token, 'sergio342');
        req.userId = verification.id;
        next();
    } catch (error) {
        console.log(error)
        
        return res.status(401).json({ message: "Token inválido" });
    }
};

export const verifyAdmin = async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await UsuariosService.getUsuarioById(userId);
        if (!user || !user.admin) {
            return res.status(403).json({ message: "ARAFUE" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};