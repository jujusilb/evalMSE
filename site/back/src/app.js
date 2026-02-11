import express from "express";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { healthRoutes } from "./routes/healthRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { ingredientRoutes } from "./routes/ingredientRoutes.js";
import { platRoutes } from "./routes/platRoutes.js";
import userRouter from "./routes/userRoutes.js";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(logger);


// Route de base
  app.get("/", (req, res) => {
    res.json({
      message: "et bon appetit bien sur !",
      recette: "/recette"
    });
  });


  app.use(healthRoutes);
  app.use(authRoutes);
  app.use(ingredientRoutes);
  app.use(platRoutes);
app.use(userRouter);



  // 404 simple
  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use(errorHandler);

  return app;
};

