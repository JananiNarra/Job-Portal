import express from "express";
import multer from "multer";
import nlp from "compromise";

const router = express.Router();

// Multer config for text/PDF uploads (basic version: plain text only for now)
const upload = multer({ storage: multer.memoryStorage() });

// Example skill dictionary (expand as needed)
const SKILL_KEYWORDS = [
  "javascript", "react", "node", "express", "mongodb", "python",
  "java", "sql", "html", "css", "blockchain", "solidity", "ethers",
  "ai", "ml", "nlp", "docker", "aws", "git", "typescript"
];

// POST /api/ai/extract-skills
router.post("/extract-skills", upload.single("resume"), (req, res) => {
  try {
    const resumeText = req.file.buffer.toString("utf-8").toLowerCase();
    const doc = nlp(resumeText);

    // Extract candidate skills based on dictionary
    const foundSkills = SKILL_KEYWORDS.filter(skill =>
      doc.has(skill)
    );

    res.json({
      success: true,
      extractedSkills: [...new Set(foundSkills)]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Skill extraction failed" });
  }
});

export default router;
