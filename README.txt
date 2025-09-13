Assignment project with Express + MongoDB
=========================================

Backend:
- Built with Express.js and Mongoose.
- Serves static audio files from /static/audio.
- GET /api/audio?lang=English (or Arabic) queries MongoDB for the URL and returns it.

Frontend:
- Next.js app replicating the given screenshots.
- Dropdown to select language -> fetches from backend -> plays audio.

Run instructions
----------------
1. Backend:
   cd backend
   npm install
   cp .env.example .env
   # edit .env to point to your MongoDB if needed
   npm run seed
   npm run dev

2. Frontend:
   cd frontend
   npm install
   npm run dev

Then open http://localhost:3000

Notes:
- MongoDB must be running locally or accessible via connection string in .env
- Audio URLs are stored in the database and map to static files.
