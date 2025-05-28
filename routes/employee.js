import express from "express";
import Employee from "../models/employee";

const router = express.Router();

router.get("/employee", async (req, res) => {
  try {
    const employees = await Employee.find()
    res.status(200).json({
      employees
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Internal Server Error.'
    })
  }
});



router.post("employee", async (req, res) => {
  try {
    const { firstname, lastname, email, birthdate, department } = req.body

    if (!(firstname && lastname && email && birthdate && department)) {
      res.send("Please enter the details.")
    }
    const checkEmployee = await Employee.findOne({ firstname, email })
    if (checkEmployee) {
      return res.status(409).json({
        message: "Employee already exists."
      })
    }
    const employee = new Employee({ firstname, lastname, email, birthdate, department })
    await employee.save()
    return res.status(201).json({
      message: 'Employee created successfully.',
      employee
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }

})

export default router;
