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
