# JobPortal 🚀

An AI-powered job portal that helps job seekers and employers connect efficiently.  
Key features include **AI-based resume skill extraction**, **job match scoring**, **secure payments for posting jobs**, and **user-friendly UI/UX**.

---

## Features

- 👤 User Authentication (Register/Login with validations)
- 🧾 Profile Management (Bio, LinkedIn, Skills, Wallet)
- 📄 Resume Skill Extraction (AI-enhanced skill parsing from uploaded resumes)
- 📊 Job Match Score (Compares candidate skills with job requirements)
- 💼 Post & Browse Jobs (with filters for skills, tags, and location)
- 💳 Secure Payments for posting jobs (Ethereum wallet integration)
- 🎨 Professional UI/UX with React, Tailwind, and animations

---

##  Project Structure
jobportal/
│
├── backend/ # Express.js Backend
│ ├── controllers/ # Route controllers (auth, jobs, AI)
│ ├── middleware/ # Authentication middleware
│ ├── models/ # MongoDB models (User, Job)
│ ├── routes/ # API routes
│ ├── uploads/ # Resume uploads
│ └── server.js # Express app entry point
│
├── frontend/ # React Frontend
│ ├── src/
│ │ ├── components/ # Reusable components (SkillExtractor, JobCard, etc.)
│ │ ├── pages/ # Pages (Home, Jobs, Profile, Login, Register)
│ │ └── App.jsx # Main App router
│ └── package.json
│README 
#Documentation
git clone (https://github.com/JananiNarra/Job-Portal.git)
cd jobportal
Backend Setup
cd backend
npm install
-Create a .env file inside backend/ with:
.env
MONGO_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=supersecretkey
PORT=5000
-Run the backend 
 npm start
 -Run the frontend
  cd frontend
  npm install
  npm run dev 
-Usage
Register/Login as a user.
Complete your profile with bio, LinkedIn, and wallet address.
Upload a resume to extract skills via AI.
Browse available jobs.
View your match score for each job.
Post a job (requires payment on Ethereum Sepolia testnet).
Job seekers can filter jobs by location, skills, and tags.

📌 Tech Stack
  Frontend: React, React Router, TailwindCSS, Vite
  Backend: Node.js, Express.js, MongoDB
  Authentication: JWT + bcrypt
  AI Enhancements: Resume skill extraction, job match scoring
  Blockchain Integration: Ethereum Wallet (Sepolia Testnet)
  UI Enhancements: react-icons, animations, gradient UI

💡 Future Enhancements
Candidate-job chat system
Premium job postings & subscriptions
Push notifications for new job matches
Resume parsing with GPT for richer analysis

👩‍💻 Run Instructions
Start backend first → cd backend && npm start
Start frontend → cd frontend && npm run dev
Visit: http://localhost:5173


 



