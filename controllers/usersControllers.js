import fs from "fs/promises";
import path from "path";
import HttpError from "../helpers/HttpError.js";
import * as usersServices from "../services/userServices.js";
import gravatar from "gravatar";
import { resizeImage } from "../services/imageServices.js";

export const createUser = async (req, res, next) => {
  const { email } = req.body;
  const normalizeEmail = email.toLowerCase().trim();
  try {
    const user = await usersServices.findUserByEmail(normalizeEmail);
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const avatarURL = gravatar.url(normalizeEmail);
    const newUser = await usersServices.createUser({
      ...req.body,
      email: normalizeEmail,
      avatarURL,
    });
    res.status(201).send({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logInUser = async (req, res, next) => {
  const { email, password } = req.body;
  const normalizeEmail = email.toLowerCase().trim();
  try {
    const user = await usersServices.findUserByEmail(normalizeEmail);
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const isPasswordValid = await usersServices.validatePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw HttpError(401, "Email or password is wrong");
    }
    const newUser = await usersServices.logInUser(user.id);
    res.send({
      token: newUser.token,
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};

export const logOutUser = async (req, res, next) => {
  try {
    await usersServices.logOutUser(req.user.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await usersServices.findUserById(req.user.id);
    res.send({ email: user.email, subscription: user.subscription });
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, "Select a file to upload");
    }

    await resizeImage(req.file.path, 250, 250);
    fs.rename(
      req.file.path,
      path.join(process.cwd(), "public", "avatars", req.file.filename)
    );
    const avatarURL = path.join("avatars", req.file.filename);

    await usersServices.updateUser(req.user.id, { avatarURL });
    res.send({ avatarURL });
  } catch (error) {
    next(error);
  }
};
