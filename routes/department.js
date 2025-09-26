import express from "express";
import Department from "../models/department.js";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("this is cookies", req.cookies);
  const userId = req.cookies["better-auth-user"];
  const departments = await Department.find({ userId }).exec();
  return res.json(departments);
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const department = await Department.findById(id);
    res.status(200).json(department);
  } catch (error) {
    console.error(error);
  }
});
router.post("/", async (req, res) => {
  const userId = req.cookies["better-auth-user"];
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json("Please enter the department name.");
    }
    const checkDepartment = await Department.find({ userId });
    const found = checkDepartment.find((item) => item.name === name);
    if (found) {
      return res.status(409).json({
        message: "Department already exists.",
      });
    }

    const department = new Department({ name, userId });
    await department.save();
    return res.status(201).json("Department created successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

router.put("/", async (req, res) => {
  const userId = req.cookies["better-auth-user"];
  try {
    const { id, newName } = req.body;
    console.log(id, newName);
    if (!newName) {
      return res.status(400).json({
        message: "Please enter the details.",
      });
    }
    const checkDepartment = await Department.find({ userId });
    const found = checkDepartment.find((item) => item.name === newName);
    if (found) {
      return res.status(409).json({
        message: "Department already exists.",
      });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { name: newName },
      { new: true },
    );
    if (!updatedDepartment) {
      return res.status(404).json({
        message: "Department not found",
      });
    }
    res.status(200).json(updatedDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
});
router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    const deleted = await Department.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        message: "Department not found",
      });
    }
    res.status(200).json({
      message: "Deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

export default router;
