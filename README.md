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
git clone https://github.com/yourusername/jobportal.git
cd jobportal
