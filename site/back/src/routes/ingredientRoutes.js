import { Router } from "express";
import { ingredientController } from "../controllers/ingredientController.js";
import { authenticateToken } from "../middlewares/auth.js";

console.log("IN INGREDIENTROUTES !")

export const ingredientRoutes = Router();

ingredientRoutes.get("/ingredient/:id/show", ingredientController.show); 
ingredientRoutes.get("/ingredients", ingredientController.index);
ingredientRoutes.post("/ingredient/create", authenticateToken, ingredientController.create);
//ingredientRoutes.post("/ingredient/:id/delete", authenticateToken, ingredientController.delete);
ingredientRoutes.patch("/ingredient/:id/edit", authenticateToken, ingredientController.edit);