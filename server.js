import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
// import express from "express";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
//routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//middlewares
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

//public
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());
app.use(cookieParser());

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test link" });
});
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(
    process.env.MONGO_URL || "mongodb://localhost:27017/hired"
  );
  app.listen(port, () => {
    console.log(`server running on port : ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

// import { value } from "./test.js";
// console.log(value);
