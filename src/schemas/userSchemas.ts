import { Joi } from "express-validation";
import type { UserLoginDataStructure } from "../types";
import { type RequestContactStructure } from "../types";

export const loginSchema = {
  body: Joi.object<UserLoginDataStructure>({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const addContactSchema = {
  body: Joi.object<RequestContactStructure>({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    avatar: Joi.string().required(),
    birthday: Joi.string().required(),
    phoneNumber: Joi.object<{ mobile: string; landline: string }>({
      mobile: Joi.string()
        .required()
        .regex(/([0-9-+*])\w+/),
      landline: Joi.string(),
    }),
    socials: Joi.object<{
      twitter: string;
      instagram: string;
      linkedin: string;
    }>({
      twitter: Joi.string().allow(""),
      instagram: Joi.string().allow(""),
      linkedin: Joi.string().allow(""),
    }),
  }),
};
