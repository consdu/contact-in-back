import type { Request, Response } from "express";
import type { RequestContactStructure } from "../types";

export interface CustomRequest extends Request {
  userId: string;
  params: {
    contactId: string;
  };
  query: {
    limit: string;
    name?: string;
  };
  body: RequestContactStructure;
}

export type CustomResponse = Pick<Response, "status" | "json">;
