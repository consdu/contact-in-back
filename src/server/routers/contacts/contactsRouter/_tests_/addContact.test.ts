import "../../../../../utils/loadEnvironments/loadEnvironments.js";
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import Contact from "../../../../../database/models/Contact.js";
import connectToDatabase from "../../../../../utils/connectToDatabase/connectToDatabase.js";
import { paths } from "../../../../../constants.js";
import app from "../../../../index.js";
import { tokenMock } from "../../../../../mocks/user/userMocks";
import { requestContactMock } from "../../../../../mocks/contacts/contactsMock";

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

describe("Given a POST /contacts endpoint", () => {
  describe("When it receives a request with a valid contact", () => {
    test("Then it should respond with status code 201", async () => {
      const expectedStatusCode = 201;

      await request(app)
        .post(`${paths.contacts}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .send(requestContactMock)
        .expect(expectedStatusCode);
    });

    test("Then it should respond with the contact", async () => {
      const response = await request(app)
        .post(`${paths.contacts}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .send(requestContactMock);

      const [contact] = await Contact.find({ name: requestContactMock.name });

      expect(response.body.contact.name).toBe(contact.name);
    });
  });

  describe("When it receives a request with an invalid contact", () => {
    test("Then it should respond with status code 400", async () => {
      const expectedStatusCode = 400;

      await request(app)
        .post(`${paths.contacts}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatusCode);
    });
  });
});
