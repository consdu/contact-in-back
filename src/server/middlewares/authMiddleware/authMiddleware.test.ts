import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import auth from "./authMiddleware.js";
import { type CustomRequest } from "../../types.js";
import { tokenMock, tokenPayloadMock } from "../../../mocks/user/userMocks.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a auth middleware", () => {
  const res = {};
  const next = jest.fn();

  describe("When it receives a request with a valid token and a next function", () => {
    test("Then it should the next function", () => {
      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(`Bearer ${tokenMock}`),
      };

      jwt.verify = jest.fn().mockReturnValue(tokenPayloadMock);

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with a missing token and a next function", () => {
    test("Then it should call the next function with 'Missing token' error", () => {
      const expectedError = new CustomError(401, "Missing token");
      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(""),
      };

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with an invalid token and a next function", () => {
    test("Then it should call the next function with 'Invalid token' error", () => {
      const expectedError = new CustomError(401, "Invalid token");
      expectedError.name = "JsonWebTokenError";

      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue("Bearer 7645"),
      };

      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
