import { Router } from "express";
import { getContacts } from "../../../controllers/contacts/contactsControllers.js";
import auth from "../../../middlewares/authMiddleware/authMiddleware.js";

const contactsRouter = Router();

contactsRouter.get("/", auth, getContacts);

export default contactsRouter;
