import type { Request, Response, NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddlewares";
import validationErrorMock from "../../../mocks/errors/validationErrorMock";

type CustomResponse = Pick<Response, "status" | "json">;

const res: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req = {};
const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware", () => {
  describe("When it is called with an unknown error", () => {
    test("Then it should call response's methods status with code 500 and json with 'Server internal error", () => {
      const error = new Error("Unknown");
      const expectedMessage = "Server internal error";
      const expectedStatusCode = 500;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ error: expectedMessage });
    });
  });

  describe("When called with a custom error", () => {
    test("Then it should call response's methods status with code 409 and json with 'User already exists'", () => {
      const expectedStatusCode = 409;
      const customError = new CustomError(
        expectedStatusCode,
        "User already exists"
      );
      const { publicMessage } = customError;

      generalError(
        customError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ error: publicMessage });
    });
  });

  describe("When called with a custom validation error", () => {
    test("Then it should call response's methods status with 411 and json with 'password is required'", () => {
      const expectedMessage = "password is required";

      generalError(
        validationErrorMock,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(validationErrorMock.statusCode);
      expect(res.json).toHaveBeenCalledWith({ error: expectedMessage });
    });
  });
});

describe("Given a notFoundError middleware", () => {
  describe("When called with a next function", () => {
    test("Then it should call the received next function with a custom error", () => {
      const expectedError = new CustomError(404, "Endpoint not found");

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
