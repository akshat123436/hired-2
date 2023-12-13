import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
// import express from "express";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
//routers
import jobRouter from "./routes/jobRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test link" });
});
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
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
