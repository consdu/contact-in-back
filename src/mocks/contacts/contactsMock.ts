import { Types } from "mongoose";
import type { ContactDatabaseStructure } from "../../types";

export const databaseContactsMock: ContactDatabaseStructure[] = [
  {
    _id: new Types.ObjectId("64708e362ae55ae082cebe8f"),
    name: "John",
    surname: "Doe",
    avatar: "example.png",
    phoneNumber: {
      mobile: "1",
    },
    address: "example street",
    email: "example email",
    socials: {},
    birthday: "10/10/1992",
    user: new Types.ObjectId("646f6a0da1b8a16b45eabf43"),
  },
  {
    _id: new Types.ObjectId("64708e362ae55ae082cebe90"),
    name: "Jane",
    surname: "Smith",
    avatar: "example.png",
    phoneNumber: {
      mobile: "1",
    },
    address: "example street",
    email: "example email",
    socials: {},
    birthday: "10/10/1991",
    user: new Types.ObjectId("646f6a9da1b8a16b45eabf44"),
  },
];
