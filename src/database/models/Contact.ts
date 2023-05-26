import { Schema, Types, model } from "mongoose";
import User from "./User.js";

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  surname: {
    type: String,
    required: true,
    lowercase: true,
  },
  avatar: {
    type: String,
    lowercase: true,
  },
  phoneNumber: {
    mobile: { type: String, required: true, lowercase: true },
    landline: { type: String, lowercase: true },
  },
  email: {
    type: String,
    required: true,
  },
  socials: {
    twitter: { type: String, lowercase: true },
    instagram: { type: String, lowercase: true },
    linkedin: { type: String, lowercase: true },
  },
  birthday: {
    type: Date,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: User,
    required: true,
  },
});

const Contact = model("Contact", contactSchema, "contacts");

export default Contact;
