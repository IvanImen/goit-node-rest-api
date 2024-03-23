import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { findUserById } from "../services/userServices.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      throw HttpError(401, "Not authorized");
    }
    const [bearer, token] = authHeader.split(" ", 2);
    if (bearer !== "Bearer") {
      throw HttpError(401, "Not authorized");
    }
    const { SECRET_KEY } = process.env;
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await findUserById(id);
    if (!user || !user.token || token !== user.token) {
      throw HttpError(401, "Not authorized");
    }
    if (!user.verify) {
      throw HttpError(401, "Your email isn't verified");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
