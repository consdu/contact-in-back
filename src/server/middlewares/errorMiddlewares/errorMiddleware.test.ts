import type { Request, Response, NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddlewares";

type CustomResponse = Pick<Response, "status" | "json">;

const response: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const request = {};
const next = jest.fn();

describe("Given a generalError middleware", () => {
  describe("When it is called with an unknown error", () => {
    test("Then it should call response's methods status with code 500 and json with 'Server internal error", () => {
      const error = new Error("Unknown");
      const expectedMessage = "Server internal error";
      const expectedStatusCode = 500;

      generalError(
        error as CustomError,
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(response.json).toHaveBeenCalledWith({ error: expectedMessage });
    });
  });

  describe("When called with a custom error", () => {
    test("Then it should call response's methods status with code 409 and json with 'User already exists'", () => {
      const statusCode = 409;
      const customError = new CustomError(statusCode, "User already exists");
      const { publicMessage } = customError;

      generalError(
        customError,
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(statusCode);
      expect(response.json).toHaveBeenCalledWith({ error: publicMessage });
    });
  });
});

describe("Given a notFoundError middleware", () => {
  describe("When called with a next function", () => {
    test("Then it should call the received next function with a custom error", () => {
      const expectedError = new CustomError(404, "Endpoint not found");

      notFoundError(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
