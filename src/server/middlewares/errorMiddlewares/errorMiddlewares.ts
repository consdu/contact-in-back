import createDebug from "debug";
import chalk from "chalk";
import type { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validation";
import CustomError from "../../../CustomError/CustomError.js";

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
  debug(chalk.redBright(error.message));

  if (error instanceof ValidationError) {
    const validationErrorMessages = error.details.body
      ?.map((joiError) => joiError.message)
      .join(" & ")
      .replaceAll('"', "");

    (error as CustomError).publicMessage = validationErrorMessages;

    debug(chalk.redBright(validationErrorMessages));
  }

  const statusCode = error.statusCode ?? 500;
  const publicMessage = error.statusCode
    ? error.publicMessage
    : "Server internal error";

  res.status(statusCode).json({ error: publicMessage });
};
