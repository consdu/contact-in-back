import { Router } from "express";
import { validate } from "express-validation";
import { loginSchema } from "../../../schemas/userSchemas.js";
import { loginUser } from "../../controllers/user/userController.js";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
