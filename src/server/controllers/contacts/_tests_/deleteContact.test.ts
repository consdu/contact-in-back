import type { NextFunction, Response } from "express";
import Contact from "../../../../database/models/Contact.js";
import type { CustomRequest } from "../../../types";
import { databaseContactsMock } from "../../../../mocks/contacts/contactsMock.js";
import { deleteContact } from "../contactsControllers.js";
import CustomError from "../../../../CustomError/CustomError.js";

const userId = "test-user-id";
const contactId = "test-id";

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a deleteContact controller", () => {
  const req: Partial<CustomRequest> = {
    userId,
    params: {
      contactId,
    },
  };

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request and the contact exists", () => {
    test("Then it should call response's method status with 204 and json with 'Contact deleted succesfully'", async () => {
      const expectedStatusCode = 204;
      const expectedJsonResponse = {
        message: "Contact deleted succesfully",
      };

      Contact.findOneAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(databaseContactsMock[0]),
      });
      await deleteContact(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedJsonResponse);
    });
  });

  describe("When it receives a request and the contact doesn't exist", () => {
    test("Then it should call next function with 'Contact not found' error", async () => {
      const expecteError = new CustomError(404, "Contact not found");

      Contact.findOneAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await deleteContact(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expecteError);
    });
  });
});
