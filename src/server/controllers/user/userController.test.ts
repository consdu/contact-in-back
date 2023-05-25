import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextFunction, Response } from "express";
import type { UserLoginRequestStructure } from "../../../types";
import {
  tokenMock,
  userDatabaseMock,
  userLoginMock,
} from "../../../mocks/user/userMocks.js";
import { loginUser } from "./userController.js";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser controller", () => {
  const req: Pick<UserLoginRequestStructure, "body"> = {
    body: userLoginMock,
  };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with valid credentials", () => {
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    jwt.sign = jest.fn().mockReturnValue(tokenMock);

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(userDatabaseMock),
    });

    test("Then it should call response's methods status with 200", async () => {
      const expectedStatusCode = 200;

      await loginUser(
        req as UserLoginRequestStructure,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call response's methods json with a token", async () => {
      await loginUser(
        req as UserLoginRequestStructure,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token: tokenMock });
    });
  });

  describe("When it receives a request with invalid credentials", () => {
    test("Then it should call the next function with a custom error 401 and 'Wrong credentials'", async () => {
      const error = new CustomError(401, "Wrong credentials");

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      bcrypt.compare = jest.fn().mockReturnValue(false);

      await loginUser(
        req as UserLoginRequestStructure,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
