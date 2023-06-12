import type { Response, NextFunction } from "express";
import Contact from "../../../../database/models/Contact";
import { responseContactMock } from "../../../../mocks/contacts/contactsMock";
import type {
  CustomRequest,
  CustomResponse,
  CustomUpdateRequest,
} from "../../../types";
import { updateContact } from "../contactsControllers";

const userId = responseContactMock.user;
const body = responseContactMock;

describe("Given an updateContact controller", () => {
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
    test("Then it should call reponse's method status with 200 and json with message 'Contact updated succesfully'", async () => {
      Contact.findByIdAndUpdate = jest
        .fn()
        .mockReturnValue(responseContactMock);

      const expectedStatusCode = 200;
      const expectedMessage = "Contact updated succesfully";

      await updateContact(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a request with a contact and the there is a database error", () => {
    test("Then it should call the next function with the error", async () => {
      const error = new Error("Server internal error");

      Contact.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await updateContact(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
