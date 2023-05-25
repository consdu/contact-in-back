import type {
  UserDatabaseStructure,
  UserLoginDataStructure,
} from "../../types";
import { Types } from "mongoose";
export const userLoginMock: UserLoginDataStructure = {
  username: "admin",
  password: "admin",
};

export const userDatabaseMock: UserDatabaseStructure = {
  ...userLoginMock,
  name: "Admin",
  _id: new Types.ObjectId(),
};

export const tokenMock =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiJ9.msGbgu59-Lc0LY4KzjqFzxZ59-i61iDgopl4m1XHyOk";
