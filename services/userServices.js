import { User } from "../db/models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function findUser(data) {
  const user = await User.findOne(data);
  return user;
}

export async function findUserById(id) {
  const user = await User.findById(id);
  return user;
}

export async function createUser({
  email,
  password,
  avatarURL,
  verificationToken,
}) {
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });
  const user = await newUser.save();
  return user;
}

export async function validatePassword(password, hashedPassword) {
  const isPasswordValid = await bcryptjs.compare(password, hashedPassword);
  return isPasswordValid;
}

async function createToken(id) {
  const payload = { id };
  const { SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}

export async function logInUser(id) {
  const token = await createToken(id);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
}

export async function logOutUser(id) {
  await User.findByIdAndUpdate(id, { token: null });
}

export async function updateUser(id, payload) {
  const user = await User.findByIdAndUpdate(id, payload, { new: true });
  return user;
}
