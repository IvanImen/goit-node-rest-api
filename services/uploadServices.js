import multer from "multer";
import * as path from "node:path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(process.cwd(), "temp"));
  },
  filename(req, file, cb) {
    const extension = path.extname(file.originalname);
    const fileBase = path.basename(file.originalname, extension);
    const randomString = crypto.randomUUID();
    const fileName = `${fileBase}-${randomString}${extension}`;
    cb(null, fileName);
  },
});

export default multer({ storage });
