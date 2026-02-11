import { Router } from "express";
import { platController } from "../controllers/platController.js";
import { authenticateToken } from "../middlewares/auth.js";

export const platRoutes = Router();

platRoutes.get("/plat/:id/show", platController.show); 
platRoutes.get("/plats", platController.index);
platRoutes.post("/plat/create", authenticateToken, platController.create);
//platRoutes.post("/plat/:id/delete", authenticateToken, platController.delete);
platRoutes.patch("/plat/:id/edit", authenticateToken, platController.edit);

