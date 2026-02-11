import express from "express";
import {userController} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";

const userRouter = express.Router(); // On définit userRouter ici

userRouter.get("/index", userController.index);
userRouter.post("/acheterIngredient", userController.acheterIngredient);
userRouter.get("/:id/show", userController.show);
userRouter.put("/:id/update", userController.edit);
userRouter.post("/testPlat", authenticateToken, userController.testPlat); 

export default userRouter;
