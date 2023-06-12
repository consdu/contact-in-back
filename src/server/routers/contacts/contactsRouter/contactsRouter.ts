import { Router } from "express";
import {
  addContact,
  deleteContact,
  getContact,
  getContacts,
  searchContacts,
  updateContact,
} from "../../../controllers/contacts/contactsControllers.js";
import auth from "../../../middlewares/authMiddleware/authMiddleware.js";
import { validate } from "express-validation";
import { addContactSchema } from "../../../../schemas/userSchemas.js";
import { paths } from "../../../../constants.js";

const contactsRouter = Router();

contactsRouter.get("/", auth, getContacts);

contactsRouter.get("/id/:contactId", auth, getContact);

contactsRouter.get(paths.search, auth, searchContacts);

contactsRouter.delete("/:contactId", auth, deleteContact);

contactsRouter.put("/", auth, updateContact);

contactsRouter.post(
  "/",
  validate(addContactSchema, {}, { abortEarly: false }),
  auth,
  addContact
);

export default contactsRouter;
