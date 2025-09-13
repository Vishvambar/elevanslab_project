🎙️ ElevenLabs Clone

This project replicating parts of the ElevenLabs website UI.
It includes a Next.js frontend and an Express + MongoDB backend, with audio playback functionality.

🔗 Live Demo

Frontend (Vercel) → https://elevanslab.vercel.app/

Backend API (Render) → https://elevanslab.onrender.com/


🚀 Features

Frontend (Next.js): Responsive UI with multiple tabs.

Backend (Express.js + MongoDB): Stores and serves audio file URLs.

Database (MongoDB Atlas): Audio metadata (language + URL).

Audio Features:

Dropdown to select language (English, Arabic, …).

Play audio 🎧.

Download audio ⬇️.

Text editor area.

Deployment:

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

📂 Project Structure
/frontend   → Next.js app (UI)
/backend    → Express app (API + MongoDB + static audio)
/backend/static/audio → .wav files for each language

⚙️ Local Setup
1. Clone Repo
git clone https://github.com/YOUR_USERNAME/elevanslab_project.git
cd elevanslab_project

2. Backend
cd backend
npm install


Create .env in backend/:

MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/assignment
PORT=8000


Start backend:

npm run start


Backend runs at → http://localhost:8000

3. Frontend
cd ../frontend
npm install


Create .env.local in frontend/:

NEXT_PUBLIC_API_URL=http://localhost:8000


Start frontend:

npm run dev


Frontend runs at → http://localhost:3000

🌍 Deployment
Backend (Render)

Root Directory: backend

Build Command: npm install

Start Command: node server.js

Env Vars:

MONGO_URI=your_mongo_atlas_uri

Frontend (Vercel)

Root Directory: frontend

Build Command: npm run build

Output Directory: .next

Env Vars:

NEXT_PUBLIC_API_URL=https://your-backend.onrender.com

🌐 Adding More Languages

Add new .wav files into backend/static/audio/.

Insert a document into MongoDB (Atlas UI or seed script):

{ "lang": "Hindi", "url": "/static/audio/hindi.wav" }


Add language to the frontend dropdown.

Redeploy → done.

🔊 API Endpoints

GET /api/health → { "status": "ok" }

GET /api/audio?lang=English → returns audio record from MongoDB

GET /static/audio/english.wav → serves actual audio file