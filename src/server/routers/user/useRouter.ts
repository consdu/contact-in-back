import { Router } from "express";
import { validate } from "express-validation";
import { loginSchema } from "../../../schemas/userSchemas";
import { loginUser } from "../../controllers/user/userController";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
