import type { Response, NextFunction } from "express";
import Contact from "../../../../database/models/Contact";
import {
  requestContactMock,
  responseContactMock,
} from "../../../../mocks/contacts/contactsMock";
import type { CustomRequest, CustomResponse } from "../../../types";
import { addContact } from "../contactsControllers";

const userId = "test-user-id";
const body = requestContactMock;

describe("Given an addContact controller", () => {
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const req: Partial<CustomRequest> = {
    userId,
    body,
  };

  const next = jest.fn();

  describe("When it receives a request with a contact", () => {
    test("Then it should call reponse's method status with 201 and json with the contact", async () => {
      const expectedStatusCode = 201;

      Contact.create = jest.fn().mockReturnValue(responseContactMock);

      await addContact(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ contact: responseContactMock });
    });
  });

  describe("When it receives a request with a contact and the there is a database error", () => {
    test("Then it should call the next function with the error", async () => {
      const error = new Error("Server internal error");

      Contact.create = jest.fn().mockRejectedValue(error);

      await addContact(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
