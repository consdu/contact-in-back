import jwt from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import type { CustomRequest } from "../../types.js";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      throw new CustomError(401, "Missing token");
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = payload.sub as string;

    req.userId = userId;

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? new CustomError(401, "Invalid token")
        : error;

    next(customError);
  }
};

export default auth;
