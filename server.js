import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateVisualPrompt } from "./claudeService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Living Curriculum Backend is running");
});

app.post("/generate-image", async (req, res) => {
  const { stepDescription } = req.body;

  if (!stepDescription) {
    return res.status(400).json({
      error: "stepDescription is required",
    });
  }

  try {
    const visualPrompt = await generateVisualPrompt(stepDescription);

    // TEMPORARY: return text prompt for review
    res.json({
      visualPrompt: visualPrompt,
    });

  } catch (error) {
    console.error("Claude error:", error);
    res.status(500).json({
      error: "Failed to generate visual prompt",
    });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
