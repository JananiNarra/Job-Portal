import React, { useState } from "react";
import axios from "axios";

const SkillExtractor = ({ onSkillsExtracted }) => {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please upload a resume file first.");
      return;
    }
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/extract-skills",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const extractedSkills = response.data.extractedSkills;
      setSkills(extractedSkills);
      onSkillsExtracted(extractedSkills);
      setMessage("Skills extracted successfully ✅");

      // ✅ Update backend user profile with extracted skills
      const token = localStorage.getItem("token");
      if (token && extractedSkills.length > 0) {
        await axios.put(
          "http://localhost:5000/api/users/update-skills",
          { skills: extractedSkills },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error("Error uploading file:", err.response?.data || err.message);
      setMessage("Skill extraction failed ❌");
    }
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">
        Resume Skill Extractor 📄
      </h2>
      <input
        type="file"
        accept=".txt,.pdf,.doc,.docx"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
      >
        Extract Skills
      </button>
      {message && <p className="mt-3 text-sm">{message}</p>}
      {skills.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Extracted Skills:</h3>
          <ul className="list-disc pl-5">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillExtractor;
