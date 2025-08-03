import express from "express";
import { protect as authMiddleware } from "../middleware/authMiddleware.js";


import Job from "../models/Job.js";

const router = express.Router();

// ✅ Post a new job (only logged‑in users)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, skills, budget, location, tags } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newJob = new Job({
      title,
      description,
      skills,
      budget,
      location,
      tags,
      createdBy: req.user.id,
      
       walletAddress: req.body.walletAddress,
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (err) {
    res.status(500).json({ message: "Error posting job", error: err.message });
  }
});

// ✅ Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err.message });
  }
});

// ✅ Get jobs posted by logged‑in user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const myJobs = await Job.find({ createdBy: req.user.id });
    res.json(myJobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your jobs", error: err.message });
  }
});

export default router;
