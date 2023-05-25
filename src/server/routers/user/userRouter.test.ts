import "../../../utils/loadEnvironments/loadEnvironments.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../index.js";
import User from "../../../database/models/User.js";
import {
  userDatabaseMock,
  userLoginMock,
} from "../../../mocks/user/userMocks.js";
import connectToDatabase from "../../../utils/connectToDatabase/connectToDatabase.js";

let server: MongoMemoryServer;

interface CustomResponse {
  body: { token: string };
  statusCode: number;
}

interface CustomErrorResponse {
  body: {
    error: string;
  };
  statusCode: number;
}

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST /user/login endpoint", () => {
  beforeEach(async () => {
    await User.create(userDatabaseMock);
  });

  describe("When it receives valid credentials", () => {
    test("Then it should respond with status code 200 and the user's token", async () => {
      const expectedStatusCode = 200;

      const newUser = await User.findOne({
        username: userDatabaseMock.username,
      });

      const response: CustomResponse = await request(app)
        .post("/user/login")
        .send(userLoginMock)
        .expect(expectedStatusCode);

      const payload = jwt.verify(response.body.token, process.env.JWT_SECRET!);
      const userId = payload.sub as string;

      expect(userId).toBe(newUser?._id.toString());
    });
  });

  describe("When it receives invalid credentials", () => {
    test("Then it should respond with 401 and 'Wrong credentials' message", async () => {
      const expectedStatusCode = 401;
      const expectedMessage = "Wrong credentials";

      const response: CustomErrorResponse = await request(app)
        .post("/user/login")
        .send({
          ...userLoginMock,
          username: "wrong_username",
        })
        .expect(expectedStatusCode);

      expect(response.body.error).toBe(expectedMessage);
    });
  });
});
