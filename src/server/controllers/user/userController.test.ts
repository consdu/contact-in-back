import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextFunction, Response } from "express";
import type { UserLoginRequestStructure } from "../../types";
import {
  tokenMock,
  userDatabaseMock,
  userLoginMock,
} from "../../../mocks/user/userMocks.js";
import { loginUser } from "./userController.js";
import User from "../../../database/models/User";

describe("Given a loginUser controller", () => {
  const req: Pick<UserLoginRequestStructure, "body"> = {
    body: userLoginMock,
  };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with a valid username and password", () => {
    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(userDatabaseMock),
    });

    bcrypt.compare = jest.fn().mockReturnValue(true);

    jwt.sign = jest.fn().mockReturnValue(tokenMock);

    test("Then it should call response's methods status with 200", async () => {
      const expectedStatusCode = 200;

      await loginUser(
        req as UserLoginRequestStructure,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("", async () => {
      await loginUser(
        req as UserLoginRequestStructure,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token: tokenMock });
    });
  });
});
