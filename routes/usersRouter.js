import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as schemas from "../schemas/usersSchemas.js";
import * as controllers from "../controllers/usersControllers.js";
import * as usersMiddlewares from "../middlewares/usersMiddlewares.js";
import * as commonMiddlewares from "../middlewares/commonMiddlewares.js";
import * as authMiddlewares from "../middlewares/authMiddlewares.js";
import { USER_KEYS } from "../constants/userKeys.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(schemas.createUserSchema),
  usersMiddlewares.checkUserExists,
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

usersRouter.patch(
  "/",
  authMiddlewares.protect,
  (req, res, next) =>
    commonMiddlewares.checkNecessaryKeysAvailability(
      req,
      res,
      next,
      USER_KEYS.SUBSCRIPTION
    ),
  validateBody(schemas.updateSubscriptionUserTypeSchema),
  controllers.changeUserSubscriptionController
);

usersRouter.patch(
  "/avatars",
  authMiddlewares.protect,
  usersMiddlewares.saveTemporaryAvatar,
  controllers.changeUserAvatarURL
);

usersRouter.get("/verify", controllers.verifyUserRegistrationController);

export default usersRouter;
