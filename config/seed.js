import mongoose from "mongoose";
import Employee from "../models/employee.js";
import Department from "../models/department.js";

const departments = [
  {
    name: "General Dentistry",
  },
  {
    name: "Restorative Dentistry",
  },
  {
    name: "Orthodontics",
  },
  {
    name: "Pediatric Dentistry",
  },
  {
    name: "Surgery",
  },
];

const employees = [
  {
    firstname: "John",
    lastname: "Dudley",
    birthdate: "1990-05-15",
    email: "dudley@mail.com",
    departments: ["General Dentistry"],
  },
  {
    firstname: "Lisa",
    lastname: "Harris",
    birthdate: "1990-05-15",
    email: "harris@mail.com",
    departments: ["Restorative Dentistry, Orthodontics"],
  },
  {
    firstname: "Alfred",
    lastname: "Christensen",
    birthdate: "1990-05-15",
    email: "christensen@mail.com",
    departments: ["General Dentistry"],
  },
  {
    firstname: "Janet",
    lastname: "Doe",
    birthdate: "1990-05-15",
    email: "doe@mail.com",
    departments: ["General Dentistry"],
  },
  {
    firstname: "Francisco",
    lastname: "Willard",
    birthdate: "1990-05-15",
    email: "willard@mail.com",
    departments: ["Pediatric Dentistry"],
  },
  {
    firstname: "Sarah",
    lastname: "Alvarez",
    birthdate: "1990-05-15",
    email: "alvarez@mail.com",
    departments: ["Pediatric Dentistry"],
  },
  {
    firstname: "Danny",
    lastname: "Perez",
    birthdate: "1990-05-15",
    email: "perez@mail.com",
    departments: ["Restorative Dentistry"],
  },
  {
    firstname: "Constance",
    lastname: "Smith",
    birthdate: "1990-05-15",
    email: "smith@mail.com",
    departments: ["Surgery"],
  },
  {
    firstname: "Leslie",
    lastname: "Roche",
    birthdate: "1990-05-15",
    email: "roche@mail.com",
    departments: ["Orthodontics"],
  },
  {
    firstname: "Travis",
    lastname: "Combs",
    birthdate: "1990-05-15",
    email: "combs@mail.com",
    departments: [""],
  },
];

export const seedDB = async (userId) => {
  try {
    const deletedEmp = await Employee.deleteMany({ userId });
    console.log("Existing employees deleted.", deletedEmp);
    const deletedDep = await Department.deleteMany({ userId });
    console.log("Existing departments deleted.", deletedDep);

    //insert new seed data
    await Employee.insertMany(
      employees.map((item) => ({
        ...item,
        userId,
      })),
    );
    await Department.insertMany(
      departments.map((item) => ({ ...item, userId })),
    );
    console.log("Database seeded with the data.");
  } catch (err) {
    console.log("Error seeding database: ", err);
  } finally {
    console.log("Data successfully inserted.");
  }
};
