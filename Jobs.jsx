import { useEffect, useState } from "react";
import axios from "axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [matchScores, setMatchScores] = useState({});
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data);
        setFilteredJobs(res.data);

        const token = localStorage.getItem("token");
        if (token) {
          for (const job of res.data) {
            try {
              const matchRes = await axios.get(
                `http://localhost:5000/api/match/${job._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              setMatchScores((prev) => ({
                ...prev,
                [job._id]: matchRes.data.matchScore,
              }));
            } catch (err) {
              console.error(`Error fetching match score for job ${job._id}`, err);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, []);

  const handleFilter = () => {
    let results = jobs;

    if (location) {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (skill) {
      results = results.filter((job) =>
        job.skills.some((s) =>
          s.toLowerCase().includes(skill.toLowerCase())
        )
      );
    }

    if (tag) {
      results = results.filter((job) =>
        job.tags && job.tags.some((t) =>
          t.toLowerCase().includes(tag.toLowerCase())
        )
      );
    }

    setFilteredJobs(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-10 px-6">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        💼 Job Listings
      </h2>

      {/* ✅ Filters Section */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-8 grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Filter by Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Filter by Skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Filter by Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
        <button
          onClick={handleFilter}
          className="col-span-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Apply Filters
        </button>
      </div>

      {/* ✅ Job Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-indigo-600">{job.title}</h3>
              <p className="text-gray-600">{job.description}</p>
              <p className="mt-2">
                <span className="font-semibold">Skills:</span>{" "}
                {job.skills.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Budget:</span> ₹{job.budget}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {job.location}
              </p>
              {job.tags && (
                <p>
                  <span className="font-semibold">Tags:</span>{" "}
                  {job.tags.join(", ")}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Posted by {job.createdBy?.name}
              </p>

              {/* ✅ Match Score */}
              {matchScores[job._id] !== undefined && (
                <p className="mt-3 font-semibold text-purple-700">
                  Match Score: {matchScores[job._id]}%
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            ❌ No jobs match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
