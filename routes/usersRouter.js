import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as schemas from "../schemas/usersSchemas.js";
import * as controllers from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(schemas.createUserSchema),
  controllers.registerUserController
);

usersRouter.post(
  "/login",
  validateBody(schemas.createUserSchema),
  controllers.loginUserController
);

export default usersRouter;
