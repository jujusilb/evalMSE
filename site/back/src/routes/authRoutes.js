import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.js";

export const authRoutes = Router();


authRoutes.post("/auth/register", authController.register);//Done
authRoutes.post("/auth/login", authController.login);//DONE
authRoutes.get("/auth/me", authenticateToken, authController.me);//DONE
authRoutes.get("/admin/users", authenticateToken, authController.indexUsers); //DONE
authRoutes.patch("/auth/users/:id/role", authenticateToken, authController.patchRole); //Done