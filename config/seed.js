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
    birthdate: "15-05-1990",
    email: "dudley@mail.com",
    department: ["General Dentistry"],
  },
  {
    firstname: "Lisa",
    lastname: "Harris",
    birthdate: "15-05-1990",
    email: "harris@mail.com",
    department: ["Restorative Dentistry, Orthodontics"],
  },
  {
    firstname: "Alfred",
    lastname: "Christensen",
    birthdate: "15-05-1990",
    email: "christensen@mail.com",
    department: ["General Dentistry"],
  },
  {
    firstname: "Janet",
    lastname: "Doe",
    birthdate: "15-05-1990",
    email: "doe@mail.com",
    department: ["General Dentistry"],
  },
  {
    firstname: "Francisco",
    lastname: "Willard",
    birthdate: "15-05-1990",
    email: "willard@mail.com",
    department: ["Pediatric Dentistry"],
  },
  {
    firstname: "Sarah",
    lastname: "Alvarez",
    birthdate: "15-05-1990",
    email: "alvarez@mail.com",
    department: ["Pediatric Dentistry"],
  },
  {
    firstname: "Danny",
    lastname: "Perez",
    birthdate: "15-05-1990",
    email: "perez@mail.com",
    department: ["Restorative Dentistry"],
  },
  {
    firstname: "Constance",
    lastname: "Smith",
    birthdate: "15-05-1990",
    email: "smith@mail.com",
    department: ["Surgery"],
  },
  {
    firstname: "Leslie",
    lastname: "Roche",
    birthdate: "15-05-1990",
    email: "roche@mail.com",
    department: ["Orthodontics"],
  },
  {
    firstname: "Travis",
    lastname: "Combs",
    birthdate: "15-05-1990",
    email: "combs@mail.com",
    department: [""],
  },
];

export const seedDB = async () => {
  try {
    await Employee.deleteMany({});
    console.log("Existing employees deleted.");
    await Department.deleteMany({});
    console.log("Existing departments deleted.");

    //insert new seed data
    await Employee.insertMany(employees);
    await Department.insertMany(departments);
    console.log("Database seeded with the data.");
  } catch (err) {
    console.log("Error seeding database: ", err);
  } finally {
    console.log("Data successfully inserted.");
  }
};
