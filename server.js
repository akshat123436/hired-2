import * as dotenv from "dotenv";
dotenv.config();
// import express from "express";
import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "samsung", position: "back-end" },
];

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/", (req, res) => {
  // console.log(req);
  res.json({ message: "data received", data: req.body });
});

//get all jobs
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

//create job
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "company and position not provided" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ jobs });
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
// import { value } from "./test.js";
// console.log(value);
