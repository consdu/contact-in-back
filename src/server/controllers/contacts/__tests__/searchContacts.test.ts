import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../../../types";
import { searchContacts } from "../contactsControllers";
import { databaseContactsMock } from "../../../../mocks/contacts/contactsMock.js";
import Contact from "../../../../database/models/Contact.js";

const userId = "646f6a0da1b8a16b45eabf43";
const namePattern = "John";

const userContactsByIdMock = databaseContactsMock.filter(
  (contact) => contact.user.toString() === userId
);

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a searchContacts controller", () => {
  const req: Partial<CustomRequest> = {
    userId,
    query: {
      name: namePattern,
    },
  };

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with a user id and query params name with value 'John'", () => {
    Contact.find = jest.fn().mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValue(
          userContactsByIdMock.filter((contact) =>
            contact.name.includes(namePattern)
          )
        ),
    });

    test("Then it should call the response's method status with 200", async () => {
      const expectedStatusCode = 200;

      await searchContacts(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json status with the user's contacts that include name 'John'", async () => {
      const expectedBodyResponse = { contacts: userContactsByIdMock };

      await searchContacts(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedBodyResponse);
    });
  });
});
