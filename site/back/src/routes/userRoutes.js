import express from "express";
import {userController} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";

console.log("IN USERROUTES !")

const userRouter = express.Router();

userRouter.get("/index", userController.index);
userRouter.post("/acheterIngredient", userController.acheterIngredient);
userRouter.get("/:id/show", userController.show);
userRouter.put("/:id/update", userController.edit);
userRouter.post("/testPlat", authenticateToken, userController.testPlat); 
userRouter.post("/plat/checkIf", authenticateToken, userController.checkAvantCommande); 
userRouter.post("/plat/servirPlat", authenticateToken, userController.servirPlat);
export default userRouter;
