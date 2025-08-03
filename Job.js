import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [{ type: String }],
    budget: { type: Number, required: true },
    location: { type: String },
    tags: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    walletAddress: { type: String, required: true },

  },
  { timestamps: true },
  
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
