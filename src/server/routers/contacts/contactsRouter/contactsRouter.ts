import { Router } from "express";
import {
  deleteContact,
  getContacts,
} from "../../../controllers/contacts/contactsControllers.js";
import auth from "../../../middlewares/authMiddleware/authMiddleware.js";

const contactsRouter = Router();

contactsRouter.get("/", auth, getContacts);

contactsRouter.delete("/:contactId", auth, deleteContact);

export default contactsRouter;
