import express from "express";
import { myLogger } from "./middleware/logger.js";
import employeeRouter from "./routes/employee.js";
import departmentRouter from "./routes/department.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { enforceApiKey } from "./middleware/apiKeyAuth.js";
import { seedDB } from "./config/seed.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;
const url = process.env.MONGO_URI;

connectDb(url);

seedDB();
app.use(cors({ origin: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(myLogger);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/", enforceApiKey(INTERNAL_API_KEY), employeeRouter);
app.use("/", enforceApiKey(INTERNAL_API_KEY), departmentRouter);

app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status || 500,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
