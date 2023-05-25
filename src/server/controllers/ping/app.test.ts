import "../../../utils/loadEnvironments/loadEnvironments.js";
import request from "supertest";
import app from "../../index.js";

interface CustomResponse {
  body: { message: string };
  statusCode: number;
}

describe("Given a GET / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should response with status code 200 and message '🏓 Pong", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "🏓 Pong";

      const response: CustomResponse = await request(app)
        .get("/")
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({ message: expectedMessage });
    });
  });
});
