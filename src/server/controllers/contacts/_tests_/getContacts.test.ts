import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../../../types";
import { getContacts } from "../contactsControllers";
import { databaseContactsMock } from "../../../../mocks/contacts/contactsMock.js";
import Contact from "../../../../database/models/Contact.js";

const userId = "646f6a0da1b8a16b45eabf43";

const userContactsByIdMock = databaseContactsMock.filter(
  (contact) => contact.user.toString() === userId
);

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getContacts controller", () => {
  const req: Partial<CustomRequest> = {
    userId,
  };

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with a user id", () => {
    Contact.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(userContactsByIdMock),
      }),
    });

    test("Then it should call the response's method status with 200", async () => {
      const expectedStatusCode = 200;

      await getContacts(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json status with the user's collection of contacts", async () => {
      const expectedBodyResponse = { contacts: userContactsByIdMock };

      await getContacts(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedBodyResponse);
    });
  });

  describe("When it receives a request with a user id and the exec functions rejects with a 'Database error'", () => {
    test("Then it should call the next function with error 'Database error", async () => {
      const expectedError = new Error("Database error");

      Contact.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockRejectedValue(expectedError),
        }),
      });

      await getContacts(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
