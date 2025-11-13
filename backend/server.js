import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initModels } from "./models/index.js";
import { startScheduler } from "./services/schedulerService.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Initialize DB and models
await initModels();

// Start scheduler
startScheduler();

app.get("/", (req, res) => {
  res.send("🏋️ Gym SMS Reminder is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
