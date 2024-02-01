import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as schemas from "../schemas/contactsSchemas.js";
import * as contactsMiddlewares from "../middlewares/contactsMiddleware.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import { CONTACT_KEYS } from "../constants/contactKeys.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", contactsMiddlewares.checkContactId, getOneContact);

contactsRouter.delete(
  "/:id",
  contactsMiddlewares.checkContactId,
  deleteContact
);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  contactsMiddlewares.checkContactExists,
  createContact
);

contactsRouter.put(
  "/:id",
  validateBody(schemas.updateContactSchema),
  contactsMiddlewares.contactUpdateMiddleware,
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(schemas.updateContactSchema),
  contactsMiddlewares.contactUpdateMiddleware,
  (req, res, next) =>
    contactsMiddlewares.checkNecessaryKeysAvailability(
      req,
      res,
      next,
      CONTACT_KEYS.FAVORITE
    ),
  updateStatusContact
);

export default contactsRouter;
