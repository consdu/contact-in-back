import type { Response, NextFunction } from "express";
import Contact from "../../../database/models/Contact.js";
import type { CustomRequest } from "../../types.js";
import CustomError from "../../../CustomError/CustomError.js";
import { Types } from "mongoose";

export const getContacts = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    query: { limit },
  } = req;

  try {
    const contacts = await Contact.find({ user: userId })
      .limit(Number.parseInt(limit!, 10))
      .exec();

    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    params: { contactId },
  } = req;

  try {
    const contact = await Contact.findOneAndDelete({
      _id: contactId,
      user: userId,
    }).exec();

    if (contact) {
      return res.status(200).json({ message: "Contact deleted succesfully" });
    }

    throw new CustomError(404, "Contact not found");
  } catch (error) {
    next(error);
  }
};

export const addContact = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId, body } = req;

  try {
    const contact = await Contact.create({
      ...body,
      birthday: new Date(body.birthday),
      user: new Types.ObjectId(userId),
    });

    return res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
};

export const searchContacts = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    query: { name },
  } = req;

  const pattern = new RegExp(`.*${name!}.*`, "i");

  try {
    const contacts = await Contact.find({
      $or: [
        { name: pattern, user: userId },
        { surname: pattern, user: userId },
      ],
    }).exec();

    return res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};
