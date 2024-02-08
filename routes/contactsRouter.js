import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as schemas from "../schemas/contactsSchemas.js";
import * as contactsMiddlewares from "../middlewares/contactsMiddleware.js";
import * as authMiddlewares from "../middlewares/authMiddlewares.js";
import * as commonMiddlewares from "../middlewares/commonMiddlewares.js";
import * as contactsControllers from "../controllers/contactsControllers.js";
import { CONTACT_KEYS } from "../constants/contactKeys.js";

const contactsRouter = express.Router();

contactsRouter.use(authMiddlewares.protect);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get(
  "/:id",
  contactsMiddlewares.checkContactId,
  contactsControllers.getOneContact
);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  contactsMiddlewares.checkContactExists,
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(schemas.updateContactSchema),
  contactsMiddlewares.checkUpdatedContact,
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(schemas.updateContactSchema),
  contactsMiddlewares.checkUpdatedContact,
  (req, res, next) =>
    commonMiddlewares.checkNecessaryKeysAvailability(
      req,
      res,
      next,
      CONTACT_KEYS.FAVORITE
    ),
  contactsControllers.updateContact
);

contactsRouter.delete(
  "/:id",
  contactsMiddlewares.checkContactId,
  contactsControllers.deleteContact
);

export default contactsRouter;
