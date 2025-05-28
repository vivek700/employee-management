import express from "express";
import { myLogger } from "./middleware/logger.js";
import employeeRouter from "./routes/employee.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(myLogger);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/", employeeRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
