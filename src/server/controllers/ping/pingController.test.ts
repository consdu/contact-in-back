import type { Request, Response } from "express";
import ping from "./pingController.js";

type CustomResponse = Pick<Response, "status" | "json">;

describe("Given a ping function controller", () => {
  describe("When it receives a request and a response", () => {
    test("Then it should call response's methods status with 200 and json with '🏓 Pong'", () => {
      const expectedStatusCode = 200;
      const expectedMessage = "🏓 Pong";
      const request = {};
      const response: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ping(request as Request, response as Response);

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(response.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
