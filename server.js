import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
    return res.status(400).json({ error: "stepDescription is required" });
  }

  try {
    const placeholderImage =
      "https://via.placeholder.com/900x500.png?text=AI+Illustration+Coming+Soon";
    res.json({ imageUrl: placeholderImage });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate illustration" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
