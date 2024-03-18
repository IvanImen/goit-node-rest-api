import HttpError from "./HttpError.js";

const objIdRegexp = /^[a-f\d]{24}$/i;

const validateId = (req, res, next) => {
  const isValidId = req.params.id.match(objIdRegexp);
  if (!isValidId) {
    throw HttpError(400, "Not valid ID");
  }

  next();
};

export default validateId;
