import type { Response, NextFunction } from "express";
import Contact from "../../../database/models/Contact.js";
import type { CustomRequest } from "./types.js";

export const getContacts = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const contacts = await Contact.find({ user: userId }).limit(10).exec();
    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};
