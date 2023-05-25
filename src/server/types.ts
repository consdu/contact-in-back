import type { Request } from "express";

export interface UserLoginDataStructure {
  username: string;
  password: string;
}

export type UserLoginRequestStructure = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserLoginDataStructure
>;
