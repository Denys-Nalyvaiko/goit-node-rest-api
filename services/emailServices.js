import dotenv from "dotenv";
import sendgridMail from "@sendgrid/mail";
import HttpError from "../helpers/HttpError.js";

dotenv.config();

const { EMAIL_KEY, EMAIL_FROM } = process.env;

sendgridMail.setApiKey(EMAIL_KEY);

export const sendEmail = async ({ to, subject, text, html }) => {
  const message = {
    to,
    from: EMAIL_FROM,
    subject,
    text,
    html,
  };

  try {
    await sendgridMail.send(message);
  } catch ({ message }) {
    throw HttpError(400, "Email does not send");
  }
};
