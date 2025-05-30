import express from "express";
import Department from "../models/department.js";

const router = express.Router();

router.get("/department", async (req, res) => {
  const departments = await Department.find();
  return res.send(departments);
});

router.post("/department", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json("Please enter the department name.");
    }
    const checkDepartment = await Department.findOne({ name });
    if (checkDepartment) {
      return res.status(409).json({
        message: "Department already exists.",
      });
    }
    const department = new Department({ name });
    await department.save();
    return res.status(201).send("Department created successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

router.put("/department", async (req, res) => {
  try {
    const { oldName, newName } = req.body;
    if (!(oldName && newName)) {
      return res.status(400).json({
        message: "Please enter the details.",
      });
    }
    const updatedDepartment = await Department.findOneAndUpdate(
      { name: oldName },
      { name: newName },
      { new: true }
    );
    if (!updatedDepartment) {
      return res.status(404).json({
        message: "User not found",
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
router.delete("/department", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Please enter the details.",
      });
    }
    const deleted = await Department.deleteOne({ name: name });
    if (!deleted) {
      return res.status(404).json({
        message: "User not found",
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
