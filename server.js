import { app } from "./app.js";
import { connectMongoDB } from "./models/connectMongoDB.js";
import { DEFAULT_PORT } from "./constants/defaultPort.js";

const { PORT } = process.env;

export const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT ?? DEFAULT_PORT, () => {
      console.log(
        `Server is running. Use our API on port: ${PORT ?? DEFAULT_PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};
