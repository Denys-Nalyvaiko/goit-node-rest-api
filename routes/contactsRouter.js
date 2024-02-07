import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as schemas from "../schemas/contactsSchemas.js";
import * as contactsMiddlewares from "../middlewares/contactsMiddleware.js";
import * as authMiddlewares from "../middlewares/authMiddlewares.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import { CONTACT_KEYS } from "../constants/contactKeys.js";

const contactsRouter = express.Router();

contactsRouter.use(authMiddlewares.protect);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", contactsMiddlewares.checkContactId, getOneContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  contactsMiddlewares.checkContactExists,
  createContact
);

contactsRouter.put(
  "/:id",
  validateBody(schemas.updateContactSchema),
  contactsMiddlewares.checkUpdatedContact,
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(schemas.updateContactSchema),
  contactsMiddlewares.checkUpdatedContact,
  (req, res, next) =>
    contactsMiddlewares.checkNecessaryKeysAvailability(
      req,
      res,
      next,
      CONTACT_KEYS.FAVORITE
    ),
  updateContact
);

contactsRouter.delete(
  "/:id",
  contactsMiddlewares.checkContactId,
  deleteContact
);

export default contactsRouter;
