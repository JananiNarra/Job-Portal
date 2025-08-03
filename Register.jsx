import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    linkedinUrl: "",
    skills: "",
    walletAddress: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()), // convert to array
      });
      alert("✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          📝 Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          <textarea name="bio" placeholder="Short Bio" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
          <input name="linkedinUrl" placeholder="LinkedIn Profile URL" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
          <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
          <input name="walletAddress" placeholder="Wallet Address" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />

          <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
