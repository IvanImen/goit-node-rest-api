import Jimp from "jimp";
import HttpError from "../helpers/HttpError.js";

export const resizeImage = async (path, width, height) => {
  await Jimp.read(path)
    .then((image) => {
      return image.resize(width, height).writeAsync(path);
    })
    .catch((error) => {
      throw HttpError(500, `Error resizing image ${error}`);
    });
};
