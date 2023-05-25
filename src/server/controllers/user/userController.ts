import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import { type UserLoginRequestStructure } from "../../types";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";

export const loginUser = async (
  req: UserLoginRequestStructure,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new CustomError(401, "Wrong credentials");
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.name,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
