import "../../../../../utils/loadEnvironments/loadEnvironments.js";
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import Contact from "../../../../../database/models/Contact.js";
import connectToDatabase from "../../../../../utils/connectToDatabase/connectToDatabase.js";
import { databaseContactsMock } from "../../../../../mocks/contacts/contactsMock.js";
import app from "../../../../index.js";
import { tokenMock } from "../../../../../mocks/user/userMocks";
import CustomError from "../../../../../CustomError/CustomError";

const contactId = databaseContactsMock[1]._id.toString();

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

describe("Given a DELETE /contacts/:contactId endpoint", () => {
  describe("When it receives a request with a valid token and an existing contact id", () => {
    beforeEach(async () => {
      await Contact.create(databaseContactsMock[1]);
    });

    test("Then it should respond with status 204", async () => {
      const expectedStatusCode = 200;

      await request(app)
        .delete(`/contacts/${contactId}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatusCode);
    });

    test("Then it should respond with message 'Contact deleted succesfully'", async () => {
      const expectedMessage = "Contact deleted succesfully";

      const response = await request(app)
        .delete(`/contacts/${contactId}`)
        .set("Authorization", `Bearer ${tokenMock}`);

      expect(response.body.message).toStrictEqual(expectedMessage);
    });
  });

  describe("When it receives a request with a valid token and a non-existing contact id", () => {
    const expectedError = new CustomError(404, "Contact not found");

    test("Then it should respond with status 404", async () => {
      const expectedStatusCode = expectedError.statusCode;

      await request(app)
        .delete(`/contacts/${contactId}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatusCode);
    });

    test("Then it should respond with error 'Contact not found'", async () => {
      const expectedMessage = expectedError.message;

      const response = await request(app)
        .delete(`/contacts/${contactId}`)
        .set("Authorization", `Bearer ${tokenMock}`);

      expect(response.body.error).toStrictEqual(expectedMessage);
    });
  });
});
