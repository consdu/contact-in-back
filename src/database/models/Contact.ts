import { Schema, Types, model } from "mongoose";
import User from "./User.js";

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  phoneNumber: {
    mobile: { type: String, required: true },
    landline: { type: String },
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  socials: {
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
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
