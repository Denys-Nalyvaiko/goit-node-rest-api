import multer from "multer";
import path from "path";
import fse from "fs-extra";
import Jimp from "jimp";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";
import { DEFAULT_IMAGE_OPTIONS } from "../constants/defaultImageOptions.js";

export class ImageService {
  static #temporaryPath = path.resolve("tmp");
  static #staticDestinationPath;
  static #originalFileName;
  static #staticFilePath;
  static #staticPartFilePath;

  static saveOriginalTemporaryFile(name) {
    const storage = multer.diskStorage({
      destination: async (req, file, callback) => {
        try {
          await fse.ensureDir(this.#temporaryPath);
          callback(null, this.#temporaryPath);
        } catch ({ message }) {
          throw HttpError(400, message);
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

  static async saveStaticImage(options, ...destinationPath) {
    this.#staticDestinationPath = !destinationPath.length
      ? path.resolve("public", "images")
      : path.resolve(...destinationPath);

    const uniqueFileName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      this.#originalFileName;

    const temporaryFilePath = path.resolve(
      this.#temporaryPath,
      this.#originalFileName
    );

    this.#staticFilePath = path.resolve(
      this.#staticDestinationPath,
      uniqueFileName
    );

    this.#staticPartFilePath = !destinationPath.length
      ? path.join("public", "images")
      : path.join(...destinationPath.slice(1), uniqueFileName);

    try {
      await fse.ensureDir(this.#staticDestinationPath);

      await this.#processImage(temporaryFilePath, options);

      await fse.remove(temporaryFilePath);
    } catch ({ message }) {
      throw HttpError(400, message);
    }
  }

  static async saveImagePathToDB(userId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          avatarURL: this.#staticPartFilePath,
        },
        { new: true }
      );

      if (!user) {
        throw HttpError(404);
      }

      return user;
    } catch ({ message }) {
      throw HttpError(400, message);
    }
  }

  static async #processImage(temporaryFilePath, options) {
    const image = await Jimp.read(temporaryFilePath);

    await image
      .cover(
        options?.width ?? DEFAULT_IMAGE_OPTIONS.WIDTH,
        options?.height ?? DEFAULT_IMAGE_OPTIONS.HEIGHT
      )
      .writeAsync(this.#staticFilePath);
  }
}
