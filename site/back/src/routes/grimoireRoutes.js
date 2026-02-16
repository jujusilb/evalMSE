import { Router } from "express";
import { grimoireController } from "../controllers/grimoireController.js";
import { authenticateToken } from "../middlewares/auth.js";

console.log("IN grimoireROUTES !")

export const grimoireRoutes = Router();

grimoireRoutes.get("/grimoires", authenticateToken, grimoireController.index);
