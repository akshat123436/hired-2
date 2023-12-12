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
const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// app.post("/api/v1/test", validateTest, (req, res) => {
//   const { name } = req.body;

//   res.status(StatusCodes.OK).json({ msg: `Hello ${name}` });
// });
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/auth", authRouter);
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
