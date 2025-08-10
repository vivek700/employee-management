import express from "express";
import Employee from "../models/employee.js";

const router = express.Router();

router.get("/employee", async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json({
      employees,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

router.get("/employee/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

router.post("/employee", async (req, res) => {
  try {
    const { firstname, lastname, email, birthdate, departments } = req.body;
    if (!(firstname && email && birthdate)) {
      return res.send("Please enter the details.");
    }
    const checkEmployee = await Employee.findOne({ firstname, email });
    if (checkEmployee) {
      return res.status(409).json({
        message: "Employee already exists.",
      });
    }
    const employee = new Employee({
      firstname,
      lastname,
      email,
      birthdate,
      departments,
    });
    await employee.save();
    return res.status(201).json({
      message: "Employee created successfully.",
      employee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.put("/employee", async (req, res) => {
  try {
    const { id, firstname, lastname, email, birthdate, departments } = req.body;

    if (!(id && firstname && email && birthdate)) {
      return res.send("Please enter the details.");
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        birthdate,
        departments,
      },
      {
        new: true,
      },
    );
    if (!updatedEmployee) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

router.delete("/employee", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Bad request.",
      });
    }
    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.send("User deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

export default router;
