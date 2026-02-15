// src/middlewares/auth.js
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Token manquant" });
    const secret = process.env.JWT_SECRET || "Miam!";

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token invalide" });

        req.user = { 
            id: decoded.sub,
            role: decoded.role
         }; 
        next();
    });
};  