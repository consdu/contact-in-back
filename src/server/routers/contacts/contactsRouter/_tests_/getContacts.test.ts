import "../../../../../utils/loadEnvironments/loadEnvironments.js";
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import Contact from "../../../../../database/models/Contact.js";
import app from "../../../../index.js";
import connectToDatabase from "../../../../../utils/connectToDatabase/connectToDatabase.js";
import { tokenMock } from "../../../../../mocks/user/userMocks.js";
import { type ContactDatabaseStructure } from "../../../../../types.js";
import { databaseContactsMock } from "../../../../../mocks/contacts/contactsMock.js";

interface CustomResponse {
  body: { contacts: Array<Partial<ContactDatabaseStructure>> };
  statusCode: number;
}

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Contact.deleteMany();
});

describe("Given a GET /contacts endpoint", () => {
  beforeEach(async () => {
    await Contact.create(databaseContactsMock[1]);
  });

  describe("When it receives a request with a valid token", () => {
    test("Then it should respond with status 200", async () => {
      const expectedStatusCode = 200;

      const response: CustomResponse = await request(app)
        .get("/contacts")
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body.contacts).toHaveLength(1);
    });

    test("Then it should respond 1 contact", async () => {
      const expectedContactsLength = 1;

      const response: CustomResponse = await request(app)
        .get("/contacts")
        .set("Authorization", `Bearer ${tokenMock}`);

      expect(response.body.contacts).toHaveLength(expectedContactsLength);
    });
  });
});
