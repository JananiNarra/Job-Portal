import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile"
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-6"> {/* Adds spacing below navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/post-job" element={<PostJob />} />
          {/* Add Jobs, Profile, Login pages later */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
