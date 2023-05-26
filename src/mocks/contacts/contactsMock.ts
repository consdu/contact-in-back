import { Types } from "mongoose";
import type { ContactDatabaseStructure } from "../../types";

export const databaseContactsMock: ContactDatabaseStructure[] = [
  {
    _id: new Types.ObjectId("64708e362ae55ae082cebe8f"),
    name: "John",
    surname: "Doe",
    avatar: "",
    phoneNumber: {
      mobile: "",
    },
    address: "",
    email: "",
    socials: {},
    birthday: "",
    user: new Types.ObjectId("646f6a0da1b8a16b45eabf43"),
  },
  {
    _id: new Types.ObjectId("64708e362ae55ae082cebe90"),
    name: "Jane",
    surname: "Smith",
    avatar: "",
    phoneNumber: {
      mobile: "",
    },
    address: "",
    email: "",
    socials: {},
    birthday: "",
    user: new Types.ObjectId("646f6a9da1b8a16b45eabf44"),
  },
];
