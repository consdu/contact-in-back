import type { Request, Response } from "express";

export interface CustomRequest extends Request {
  userId: string;
  params: {
    contactId: string;
  };
  body: RequestBodyContactStructure;
}

export type CustomResponse = Pick<Response, "status" | "json">;

export interface RequestBodyContactStructure {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  address: string;
  birthday: string;
  avatar: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}
