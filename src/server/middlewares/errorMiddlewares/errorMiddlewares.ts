import type { Request, Response, NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import createDebug from "debug";

const debug = createDebug(
  "contacts-api:root:server:middleware:errorMiddlewares"
);

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(error.message);

  const statusCode = error.statusCode ?? 500;
  const publicMessage = error.statusCode
    ? error.publicMessage
    : "Server internal error";

  res.status(statusCode).json({ error: publicMessage });
};
