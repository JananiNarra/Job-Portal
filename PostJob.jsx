import React, { useState } from "react";
import axios from "axios";
import WalletConnect from "../components/WalletConnect.jsx";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    budget: "",
    location: "",
    tags: "",
  });

  const [walletPaid, setWalletPaid] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");

  const handlePaymentSuccess = (address) => {
    setWalletPaid(true);
    setWalletAddress(address);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!walletPaid) {
      return alert("Please complete the blockchain payment first!");
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/jobs",
        {
          ...formData,
          walletAddress,
          skills: formData.skills.split(",").map((s) => s.trim()),
          tags: formData.tags.split(",").map((t) => t.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(response.data.message);
      setFormData({
        title: "",
        description: "",
        skills: "",
        budget: "",
        location: "",
        tags: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error posting job");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Post a New Job 💼
        </h2>

        {/* Wallet connection */}
        <WalletConnect onPaymentSuccess={handlePaymentSuccess} />

        {walletPaid ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
            <textarea
              name="description"
              placeholder="Job Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="number"
              name="budget"
              placeholder="Budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
            >
              Post Job
            </button>
          </form>
        ) : (
          <p className="text-red-600 font-semibold mt-4 text-center">
            Please complete payment to post a job.
          </p>
        )}

        {message && (
          <p className="text-center mt-4 font-medium text-green-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostJob;
