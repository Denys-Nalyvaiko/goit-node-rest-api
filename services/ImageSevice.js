import multer from "multer";
import path from "path";
import fse from "fs-extra";
import Jimp from "jimp";
import HttpError from "../helpers/HttpError.js";

export class ImageService {
  static #temporaryPath = path.join(process.cwd(), "tmp");
  static #staticDestinationPath = path.join(process.cwd(), "public", "avatars");
  static #originalFileName;

  static saveOriginalTemporaryFile(name) {
    const storage = multer.diskStorage({
      destination: async (req, file, callback) => {
        try {
          await fse.ensureDir(this.#temporaryPath);
          callback(null, this.#temporaryPath);
        } catch (error) {
          throw HttpError(400);
        }
      },

      filename: (req, file, callback) => {
        this.#originalFileName = file.originalname;
        callback(null, this.#originalFileName);
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

  static async saveStaticImage() {
    try {
      const uniqueFileName =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        "-" +
        this.#originalFileName;

      const temporaryFilePath = path.join(
        this.#temporaryPath,
        this.#originalFileName
      );

      const staticFilePath = path.join(
        this.#staticDestinationPath,
        uniqueFileName
      );

      const image = await Jimp.read(temporaryFilePath);

      await fse.ensureDir(this.#staticDestinationPath);
      await image.cover(250, 250).writeAsync(staticFilePath);
      await fse.remove(temporaryFilePath);
    } catch (error) {
      throw HttpError(400);
    }
  }
}
