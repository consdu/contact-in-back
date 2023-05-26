import type { Request } from "express";
import type { Types } from "mongoose";

export interface UserLoginDataStructure {
  username: string;
  password: string;
}

export type UserLoginRequestStructure = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserLoginDataStructure
>;

export interface UserDatabaseStructure extends UserLoginDataStructure {
  name: string;
  _id: Types.ObjectId;
}

export interface ContactDatabaseStructure {
  _id: Types.ObjectId;
  name: string;
  surname: string;
  avatar: string;
  phoneNumber: {
    mobile: string;
    landline?: string;
  };
  address: string;
  email: string;
  socials: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  birthday: string;
  user: Types.ObjectId;
}
