import { Router } from "express";
import {
  addContact,
  deleteContact,
  getContacts,
} from "../../../controllers/contacts/contactsControllers.js";
import auth from "../../../middlewares/authMiddleware/authMiddleware.js";
import { validate } from "express-validation";
import { addContactSchema } from "../../../../schemas/userSchemas.js";

const contactsRouter = Router();

contactsRouter.get("/", auth, getContacts);

contactsRouter.delete("/:contactId", auth, deleteContact);

contactsRouter.post(
  "/",
  validate(addContactSchema, {}, { abortEarly: false }),
  auth,
  addContact
);

export default contactsRouter;
