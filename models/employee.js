import mongoose, { Schema } from "mongoose";

const employeeSchema = Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    birthdate: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      requird: true,
    },
    department: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
