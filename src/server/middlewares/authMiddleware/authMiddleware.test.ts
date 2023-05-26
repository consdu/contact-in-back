import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import auth from "./authMiddleware.js";
import { type CustomRequest } from "../../types.js";
import { tokenMock, tokenPayloadMock } from "../../../mocks/user/userMocks.js";

describe("Given a auth middleware", () => {
  const req: Pick<Request, "header"> = {
    header: jest.fn().mockReturnValue(`Bearer ${tokenMock}`),
  };
  const res = {};
  const next = jest.fn();

  describe("When it receives a request with a valid token and a next function", () => {
    test("Then it should the next function", () => {
      jwt.verify = jest.fn().mockReturnValue(tokenPayloadMock);

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});
