import { Router } from "express";
import { healthController } from "../controllers/healthController.js";

console.log("IN HEALTHROUTES !")

export const healthRoutes = Router();
healthRoutes.get("/health", healthController.get);
