import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as schemas from "../schemas/usersSchemas.js";
import * as controllers from "../controllers/usersControllers.js";
import * as middlewares from "../middlewares/usersMiddlewares.js";
import * as authMiddlewares from "../middlewares/authMiddlewares.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(schemas.createUserSchema),
  middlewares.checkUserExists,
  controllers.registerUserController
);

usersRouter.post(
  "/login",
  validateBody(schemas.createUserSchema),
  controllers.loginUserController
);

usersRouter.post(
  "/logout",
  authMiddlewares.protect,
  controllers.logoutUserController
);

usersRouter.get(
  "/current",
  authMiddlewares.protect,
  controllers.getCurrentController
);

export default usersRouter;
