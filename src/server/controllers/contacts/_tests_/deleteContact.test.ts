import type { NextFunction, Response } from "express";
import Contact from "../../../../database/models/Contact.js";
import type { CustomRequest } from "../../../types";
import { databaseContactsMock } from "../../../../mocks/contacts/contactsMock.js";
import { deleteContact } from "../contactsControllers.js";

const userId = "test-user-id";
const contactId = "test-id";

type CustomResponse = Pick<Response, "status" | "json">;

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
    Contact.findOneAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(databaseContactsMock[0]),
    });

    test("Then it should call response's method status with 204 and json with 'Contact deleted succesfully'", async () => {
      const expectedStatusCode = 204;
      const expectedJsonResponse = {
        message: "Contact deleted succesfully",
      };

      await deleteContact(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedJsonResponse);
    });
  });
});
