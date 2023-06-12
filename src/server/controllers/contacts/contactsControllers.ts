import type { Response, NextFunction } from "express";
import { Types } from "mongoose";
import Contact from "../../../database/models/Contact.js";
import type { CustomRequest, CustomUpdateRequest } from "../../types.js";
import CustomError from "../../../CustomError/CustomError.js";

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
      .sort({ _id: -1 })
      .exec();

    const totalCount = await Contact.count({
      user: userId,
    });

    res.status(200).json({ contacts, totalCount });
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

    if (!contact) {
      throw new CustomError(404, "Contact not found");
    }

    return res.status(200).json({ message: "Contact deleted succesfully" });
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

export const getContact = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    params: { contactId },
  } = req;

  try {
    const contact = await Contact.findOne({
      _id: contactId,
      user: userId,
    }).exec();

    if (!contact) {
      throw new Error();
    }

    return res.status(200).json({ contact });
  } catch {
    const error = new CustomError(404, "Contact not found");
    next(error);
  }
};

export const updateContact = async (
  req: CustomUpdateRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId, body } = req;

  try {
    await Contact.findByIdAndUpdate(body.id, {
      ...body,
      birthday: new Date(body.birthday),
      user: new Types.ObjectId(userId),
      _id: new Types.ObjectId(body.id),
    });

    return res.status(200).json({ message: "Contact updated succesfully" });
  } catch (error) {
    next(error);
  }
};
