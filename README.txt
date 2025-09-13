 ElevenLabs Clone 

This project replicates parts of the ElevenLabs website (as shown in the provided assignment images).
It includes a frontend (Next.js) and backend (Express + MongoDB) with basic audio playback functionality.

🚀 Features

Frontend built with Next.js (deployed on Vercel).

Backend built with Express + MongoDB (deployed on Render).

MongoDB Atlas stores audio metadata (language + file URL).

"Text to Speech" tab includes:

Language dropdown (English, Arabic, …)

Play button 🎧

Download button ⬇️

Text editor area

Other tabs exist in UI but remain empty.

Audio files are stored in backend/static/audio and served by backend.

🛠️ Tech Stack

Frontend → Next.js (React + TailwindCSS)

Backend → Express.js (Node.js)

Database → MongoDB Atlas

Deployment → Vercel (frontend) + Render (backend)

📂 Project Structure
/frontend   → Next.js app (UI)
/backend    → Express app (API + MongoDB + static audio)
/backend/static/audio → .wav files for each language

⚙️ Local Setup
1. Clone Repo
git clone https://github.com/YOUR_USERNAME/elevanslab_project.git
cd elevanslab_project

2. Setup Backend
cd backend
npm install


Create .env file in backend/:

MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/assignment
PORT=8000


Start backend:

npm run start


Backend runs at → http://localhost:8000

3. Setup Frontend
cd ../frontend
npm install


Create .env.local in frontend/:

NEXT_PUBLIC_API_URL=http://localhost:8000


Start frontend:

npm run dev


Frontend runs at → http://localhost:3000

🌍 Deployment
Backend (Render)

Push code to GitHub.

On Render → Create new Web Service.

Root directory: backend

Build Command: npm install

Start Command: node server.js

Add Environment Variable:

MONGO_URI=your_mongo_atlas_uri

Frontend (Vercel)

Import repo on Vercel.

Root directory: frontend

Build command: npm run build

Output directory: .next

Add Environment Variable:

NEXT_PUBLIC_API_URL=https://<your-backend>.onrender.com

🔊 Testing

Visit frontend (Vercel URL).

Select a language → Play → audio plays.

Click Download → .wav file downloads.

Backend API available at:

/api/health → { "status": "ok" }

/api/audio?lang=English → returns JSON with audio URL

🌐 Adding More Languages

You can easily extend the app to support more languages by adding audio files and updating the MongoDB collection.

1. Add Audio Files

Place your new .wav files in:

backend/static/audio/


Example:

backend/static/audio/hindi.wav
backend/static/audio/chinese.wav
backend/static/audio/french.wav

2. Insert into MongoDB

Each language needs a record in your MongoDB Atlas database (audios collection).

Example document:

{
  "lang": "Hindi",
  "url": "/static/audio/hindi.wav"
}


You can insert via:

Seed script (seed.js)

MongoDB Atlas UI → Collections → Insert Document

Mongo Shell / Compass

3. Update Frontend Dropdown

Open frontend/pages/index.js (or your component with the dropdown) and add new options:

<select value={lang} onChange={onLangChange}>
  <option>English</option>
  <option>Arabic</option>
  <option>Hindi</option>
  <option>Chinese</option>
  <option>French</option>
</select>

4. Test

Redeploy backend (so new static files are served).

Refresh frontend (Vercel).

Select new language → Click Play → Audio should work.