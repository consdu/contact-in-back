import { type JwtPayload } from "jsonwebtoken";
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
  password: "$2y$10$LIwKL4wtEBxBvZAAMbL9yO0p0SGcE8f1W3X36qAvBEillVl/T711G",
  _id: new Types.ObjectId(),
};

export const tokenMock =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmNmE5ZGExYjhhMTZiNDVlYWJmNDQiLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE2ODU4OTI3ODUsImV4cCI6MTY4NjQ5NzU4NX0.9h_9vmeoP3irpHBhctM0erKY1WG6u4fibPbyqy5_ld8";

export const tokenPayloadMock: JwtPayload = {
  sub: "1",
  name: "Admin",
};
