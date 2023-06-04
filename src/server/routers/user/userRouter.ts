import { Router } from "express";
import { validate } from "express-validation";
import { loginSchema } from "../../../schemas/userSchemas.js";
import { loginUser } from "../../controllers/user/userController.js";
import { paths } from "../../../constants.js";

const userRouter = Router();

userRouter.post(
  paths.login,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
