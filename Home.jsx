import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col">
      {/* ✅ Navbar */}
      <header className="w-full flex justify-between items-center px-8 py-5 bg-white shadow-md fixed top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-700">JobPortal</h1>
        <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
          <a href="#features" className="hover:text-indigo-600">Features</a>
          <a href="#stats" className="hover:text-indigo-600">Stats</a>
          <a href="#testimonials" className="hover:text-indigo-600">Testimonials</a>
        </nav>
        <button
          onClick={handleGetStarted}
          className="px-5 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700"
        >
          Login
        </button>
      </header>

      {/* ✅ Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-center flex-grow mt-24 px-6">
        {/* Left Content */}
        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg animate-fadeIn">
             Welcome to <span className="text-purple-600">JobPortal</span> 
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed animate-slideUp">
            Find your dream job, connect with top professionals, and grow your career —
            all in one place 🚀. Our AI‑powered matching ensures the best opportunities for you!
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Right Image / Illustration */}
        <div className="mt-10 md:mt-0 md:ml-12 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
            alt="Job Search"
            className="w-80 md:w-96 drop-shadow-lg animate-bounce-slow"
          />
        </div>
      </main>

      {/* ✅ Features Section */}
      <section id="features" className="py-16 px-8 bg-white shadow-inner">
        <h3 className="text-3xl font-bold text-center text-indigo-700 mb-10">
           Why Choose JobPortal?
        </h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition transform hover:-translate-y-2">
            <h4 className="text-2xl font-bold text-indigo-600 mb-4">AI Matching</h4>
            <p className="text-gray-600">
              Personalized job recommendations tailored to your resume & skills.
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition transform hover:-translate-y-2">
            <h4 className="text-2xl font-bold text-purple-600 mb-4">Smart Filters</h4>
            <p className="text-gray-600">
              Quickly filter jobs by skills, location, and tags to find the best match.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-teal-100 shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition transform hover:-translate-y-2">
            <h4 className="text-2xl font-bold text-pink-600 mb-4">Secure Payments</h4>
            <p className="text-gray-600">
              Safe, fast, and reliable transactions for job postings and applications.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Stats Section */}
      <section id="stats" className="py-16 px-8 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h4 className="text-4xl font-extrabold text-indigo-700">10K+</h4>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h4 className="text-4xl font-extrabold text-purple-700">2K+</h4>
            <p className="text-gray-600">Jobs Posted</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h4 className="text-4xl font-extrabold text-pink-600">95%</h4>
            <p className="text-gray-600">Match Accuracy</p>
          </div>
        </div>
      </section>

      {/* ✅ Testimonials Section */}
      <section id="testimonials" className="py-16 px-8 bg-white shadow-inner">
        <h3 className="text-3xl font-bold text-center text-indigo-700 mb-10">
          💬 What Our Users Say
        </h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-indigo-50 p-8 rounded-2xl shadow-md">
            <p className="text-gray-700 italic">
              "JobPortal helped me land my dream job in just 2 weeks! The AI match score was spot on."
            </p>
            <h4 className="mt-4 font-bold text-indigo-700">— Priya Sharma</h4>
          </div>
          <div className="bg-purple-50 p-8 rounded-2xl shadow-md">
            <p className="text-gray-700 italic">
              "As a recruiter, I found the platform intuitive and effective. Highly recommended!"
            </p>
            <h4 className="mt-4 font-bold text-purple-700">— Arjun Mehta</h4>
          </div>
        </div>
      </section>

      {/* ✅ CTA Banner */}
      <section className="py-12 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">🚀 Ready to Accelerate Your Career?</h3>
        <p className="mb-6 text-lg">
          Join thousands of professionals already finding success on JobPortal.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-md hover:bg-gray-200 transition"
        >
          Get Started Now
        </button>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-indigo-700 text-white py-6 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-6">
          <p>© {new Date().getFullYear()} JobPortal. All Rights Reserved.</p>
          <div className="flex gap-5 mt-4 md:mt-0">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin size={24} className="hover:text-blue-300" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub size={24} className="hover:text-gray-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter size={24} className="hover:text-blue-400" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
