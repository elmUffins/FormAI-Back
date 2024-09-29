import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

const JWT_KEY = process.env.JWT_KEY;

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Empty token or incorrect format" });
    }
    
    // Del header, se asigna el token a la variable 'token', ignorando el 'Bearer'
    const token = authHeader.split(" ")[1];
    try {
        const verification = jwt.verify(token, process.env.JWT_KEY);
        req.userId = verification.id;
        next();
    } catch (error) {
        console.log(error)
        
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const verifyAdmin = async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await UsuariosService.getUsuarioById(userId);
        if (!user || !user.admin) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default {
    verifyToken,
    verifyAdmin
}
