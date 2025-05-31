import express from "express";
import { myLogger } from "./middleware/logger.js";
import employeeRouter from "./routes/employee.js";
import departmentRouter from "./routes/department.js";
import connectDb from "./config/db.js";
import dotenv from 'dotenv'


dotenv.config()
const app = express();
const port = process.env.PORT || 3001;

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(myLogger);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/", employeeRouter);
app.use("/", departmentRouter);

app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`)
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status || 500
    }
  })
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
