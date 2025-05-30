import express from "express";
import { myLogger } from "./middleware/logger.js";
import employeeRouter from "./routes/employee.js";
import departmentRouter from "./routes/department.js";
import connectDb from "./config/db.js";

const app = express();
const port = 3000;

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(myLogger);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/", employeeRouter);
app.use("/", departmentRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
