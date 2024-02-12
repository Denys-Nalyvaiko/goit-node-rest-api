import multer from "multer";
import path from "path";
import * as fse from "fs-extra";
import HttpError from "../helpers/HttpError.js";

export class ImageService {
  static #temporaryPath = path.join(process.cwd(), "tmp");
  static #fileName;

  static saveOriginalTemporaryFile(name) {
    const storage = multer.diskStorage({
      destination: async (req, file, callback) => {
        await fse.ensureDir(this.#temporaryPath);
        callback(null, this.#temporaryPath);
      },
      filename: (req, file, callback) => {
        this.#fileName = file.originalname;

        callback(null, this.#fileName);
      },
    });

    const fileFilter = (req, file, callback) => {
      if (!file.mimetype.startsWith("image")) {
        callback(HttpError(400, "Invalid file format"), false);
        return;
      }

      callback(null, true);
    };

    const multerUpload = multer({
      storage,
      fileFilter,
    });

    return multerUpload.single(name);
  }
}
