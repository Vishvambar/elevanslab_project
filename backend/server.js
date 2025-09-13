import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

// Mongo connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/assignment_db";
mongoose.connect(MONGO_URI).then(()=>console.log("MongoDB connected")).catch(err=>console.error(err));

const audioSchema = new mongoose.Schema({
  lang: String,
  url: String
});
const Audio = mongoose.model("Audio", audioSchema);

// Routes
app.get("/api/audio", async (req,res)=>{
  const lang = req.query.lang || "English";
  try{
    const record = await Audio.findOne({lang: new RegExp("^"+lang+"$","i")});
    if(!record) return res.status(404).json({error:"Language not found"});
    res.json(record);
  }catch(e){
    res.status(500).json({error:"Server error"});
  }
});

app.get("/api/health",(req,res)=>res.json({status:"ok"}));

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>console.log("Server running on port "+PORT));
