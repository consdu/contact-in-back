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
