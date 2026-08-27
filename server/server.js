import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import driver from "./config/database.js";
import peopleRoutes from "./routes/people.js";
import skillsRoutes from "./routes/skills.js";
import learningPathsRoutes from "./routes/learningPaths.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/people", peopleRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/learning-paths", learningPathsRoutes);

// Basic API test
app.get("/", (req, res) => {
  res.json({
    message: "SkillBridge API is running",
  });
});

// CognoDB connection test
app.get("/api/health", async (req, res) => {
  try {
    await driver.verifyConnectivity();

    res.json({
      status: "ok",
      database: "CognoDB connected",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      status: "error",
      database: "CognoDB connection failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

// Dashboard statistics
app.get("/api/stats", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (person:Person)
      WITH count(person) AS people

      MATCH (skill:Skill)
      WITH people, count(skill) AS skills

      MATCH (path:LearningPath)
      RETURN
        people,
        skills,
        count(path) AS learningPaths
    `);

    const record = result.records[0];

    res.json({
      success: true,
      stats: {
        people: record.get("people").toNumber(),
        skills: record.get("skills").toNumber(),
        learningPaths: record.get("learningPaths").toNumber(),
      },
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load dashboard statistics",
    });
  } finally {
    await session.close();
  }
});

app.listen(PORT, () => {
  console.log(`SkillBridge backend running on port ${PORT}`);
});
