import { Router } from "express";
import { stockController } from "../controllers/stockController.js";
import { authenticateToken } from "../middlewares/auth.js";

console.log("IN stockROUTES !")

export const stockRoutes = Router();

stockRoutes.get("/stocks", authenticateToken, stockController.index);
