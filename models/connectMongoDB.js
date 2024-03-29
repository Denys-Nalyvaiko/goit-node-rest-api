import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST } = process.env;

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
