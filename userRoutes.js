import express from "express";
import { protect as authMiddleware} from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/userController.js";
import User from "../models/User.js";



const router = express.Router();

router.get("/me", authMiddleware, getProfile);
router.put("/me", authMiddleware, updateProfile);
// ✅ Update user skills after resume parsing
router.put("/update-skills", authMiddleware, async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ message: "Invalid skills data" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.skills = skills;
    await user.save();

    res.json({ message: "Skills updated successfully", skills: user.skills });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default router;
