import { Joi } from "express-validation";
import type { UserLoginDataStructure } from "../types";

export const loginSchema = {
  body: Joi.object<UserLoginDataStructure>({
    username: Joi.object().required(),
    password: Joi.object().required(),
  }),
};
