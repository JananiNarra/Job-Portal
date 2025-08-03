import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [skills, setSkills] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must login first.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setSkills(res.data.skills || []); // ✅ load existing skills
      } catch (err) {
        setError("Failed to load profile.");
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      return setUploadMessage("⚠️ Please select a resume file first.");
    }
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post("http://localhost:5000/api/ai/extract-skills", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const extracted = res.data.skills || [];
      setSkills(extracted);
      setUploadMessage("✅ Skills extracted successfully!");

      // Save extracted skills in DB
      await axios.put(
        "http://localhost:5000/api/users/update-skills",
        { skills: extracted },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh profile with updated skills
      const updatedUser = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(updatedUser.data);
    } catch (err) {
      setUploadMessage(err.response?.data?.message || "❌ Failed to extract skills.");
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          👤 Your Profile
        </h2>
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Bio:</span> {user.bio || "No bio set"}
          </p>
          <p>
            <span className="font-semibold">LinkedIn:</span>{" "}
            {user.linkedinUrl ? (
              <a
                href={user.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {user.linkedinUrl}
              </a>
            ) : (
              "Not provided"
            )}
          </p>
          <p>
            <span className="font-semibold">Skills:</span>{" "}
            {skills.length > 0
              ? skills.join(", ")
              : "No skills added"}
          </p>
          <p>
            <span className="font-semibold">Wallet Address:</span>{" "}
            {user.walletAddress || "Not connected"}
          </p>
        </div>
      </div>

      {/* ✅ Resume Upload Section */}
      <div className="mt-8 w-full max-w-lg bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-bold text-purple-600 mb-4">
          📄 Upload Resume to Extract Skills
        </h3>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 mb-3"
        />
        <button
          onClick={handleUpload}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Extract Skills
        </button>

        {uploadMessage && (
          <p className="mt-3 text-sm text-green-600">{uploadMessage}</p>
        )}

        {skills.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold">Extracted Skills:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
