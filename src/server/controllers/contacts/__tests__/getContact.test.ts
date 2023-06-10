import type { NextFunction, Response } from "express";
import Contact from "../../../../database/models/Contact.js";
import type { CustomRequest } from "../../../types";
import { databaseContactsMock } from "../../../../mocks/contacts/contactsMock.js";
import { getContact } from "../contactsControllers.js";
import CustomError from "../../../../CustomError/CustomError.js";

const userId = "test-user-id";
const contactId = "test-id";

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getContact controller", () => {
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
    test("Then it should call response's method status with 200 and json with the contact", async () => {
      const expectedStatusCode = 200;
      const expectedJsonResponse = {
        contact: databaseContactsMock[0],
      };

      Contact.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(databaseContactsMock[0]),
      });
      await getContact(
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

      Contact.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await getContact(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expecteError);
    });
  });
});
