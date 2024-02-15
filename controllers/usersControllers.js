import dotenv from "dotenv";
import catchAsync from "../helpers/catchAsync.js";
import * as services from "../services/usersServices.js";
import { ImageService } from "../services/ImageSevice.js";
import { sendEmail } from "../services/emailServices.js";

dotenv.config();

const { EMAIL_TO } = process.env;

export const registerUserController = catchAsync(async (req, res) => {
  const { email, subscription } = await services.registerUser(req.body);

  res.status(201).json({ user: { email, subscription } });
});

export const loginUserController = catchAsync(async (req, res) => {
  const { user, token } = await services.loginUser(req.body);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
});

export const logoutUserController = catchAsync(async (req, res) => {
  await services.logoutUser(req.user._id);

  res.sendStatus(204);
});

export const getCurrentController = catchAsync(async (req, res) => {
  const user = await services.getCurrentUser(req.user);

  res.status(200).json(user);
});

export const changeUserSubscriptionController = catchAsync(async (req, res) => {
  const user = await services.updateUser(req.user._id, req.body);

  res.status(200).json(user);
});

export const changeUserAvatarURL = catchAsync(async (req, res) => {
  await ImageService.saveStaticImage(
    req.user._id,
    { width: 250, height: 250 },
    "public",
    "avatars"
  );
  const { avatarURL } = await ImageService.saveImagePathToDB(req.user._id);

  res.status(200).json({ avatarURL });
});

export const verifyUserRegistrationController = catchAsync(async (req, res) => {
  await services.verifyUserRegistration(req.params.verificationToken);

  res.status(200).json({ message: "Verification successful" });
});

export const resendEmailVerificationController = catchAsync(
  async (req, res) => {
    await services.resendEmailVerirification(req.body.email);

    res.status(200).json({ message: "Verification email sent" });
  }
);
