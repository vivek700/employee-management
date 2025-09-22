import express from "express";
import User from "../models/user.js";
import { seedDB } from "../config/seed.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const userid = req.cookies["better-auth-user"];
  try {
    const user = await User.findOne({ id: userid }).exec();
    if (user.isAnonymous) {
      await seedDB(userid);
      res.status(200).json({ message: "Database reset successfully." });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log("Error resetting database:", err);
    res.status(500).json({
      message: "Failed to reset database.",
    });
  }
});

export default router;
