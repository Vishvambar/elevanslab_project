import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/assignment_db";

const audioSchema = new mongoose.Schema({ lang:String, url:String });
const Audio = mongoose.model("Audio", audioSchema);

await mongoose.connect(MONGO_URI);
await Audio.deleteMany({});
await Audio.insertMany([
  {lang:"English", url:"/static/audio/English.wav"},
  {lang:"Arabic", url:"/static/audio/Arabic.wav"},
  {lang:"Hindi", url:"/static/audio/Hindi.wav"},
  {lang:"Chinese", url:"/static/audio/Chinese.wav"},
  {lang:"Bengali", url:"/static/audio/Bengali.wav"}
]);
console.log("Seed complete.");
process.exit();
