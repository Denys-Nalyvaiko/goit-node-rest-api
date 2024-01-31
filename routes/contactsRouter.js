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
} from "../controllers/contactsControllers.js";

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

export default contactsRouter;
