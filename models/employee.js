import mongoose, { Schema } from "mongoose";

const employeeSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      requird: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
