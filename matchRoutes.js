import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Job from "../models/Job.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/:jobId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const job = await Job.findById(req.params.jobId);

    if (!user || !job) {
      return res.status(404).json({ message: "User or Job not found" });
    }

    const userSkills = (user.skills || []).map((s) => s.toLowerCase());
    const jobSkills = (job.skills || []).map((s) => s.toLowerCase());

    const matched = userSkills.filter((skill) => jobSkills.includes(skill));
    const score = jobSkills.length
      ? Math.round((matched.length / jobSkills.length) * 100)
      : 0;

    res.json({
      matchScore: score,
      matchedSkills: matched,
      missingSkills: jobSkills.filter((s) => !userSkills.includes(s)),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
