import { Router } from "express";
import {
  addContact,
  deleteContact,
  getContacts,
} from "../../../controllers/contacts/contactsControllers.js";
import auth from "../../../middlewares/authMiddleware/authMiddleware.js";

const contactsRouter = Router();

contactsRouter.get("/", auth, getContacts);

contactsRouter.delete("/:contactId", auth, deleteContact);

contactsRouter.post("/", auth, addContact);

export default contactsRouter;
