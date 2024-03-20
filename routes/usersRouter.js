import express from "express";
import validateBody from "../helpers/validateBody.js";
import { userSchema } from "../schemas/userSchemas.js";
import {
  createUser,
  getCurrentUser,
  logInUser,
  logOutUser,
} from "../controllers/usersControllers.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(userSchema), createUser);
usersRouter.post("/login", validateBody(userSchema), logInUser);
usersRouter.post("/logout", authMiddleware, logOutUser);
usersRouter.get("/current", authMiddleware, getCurrentUser);

export default usersRouter;
