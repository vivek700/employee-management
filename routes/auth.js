import express from "express";
import User from "../models/user.js";
import { seedDB } from "../config/seed.js";

const router = express.Router();

router.post("/handshake", async (req, res) => {
  const { name, email, id, isAnonymous } = req.body;
  try {
    await User.create({ name, email, id, isAnonymous });
    seedDB(id);
    return res.status(201).json({
      message: "New user created successfully.",
    });
  } catch (err) {
    if (err.code == 11000) {
      console.log("Already exists.");
      return res.status(200).json({ message: "User already exists." });
    }
    console.error("Error in handshake endpoint: ", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
