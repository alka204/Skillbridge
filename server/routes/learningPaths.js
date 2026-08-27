import express from "express";
import driver from "../config/database.js";

const router = express.Router();

// GET /api/learning-paths
router.get("/", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (path:LearningPath)
      OPTIONAL MATCH (path)-[:TEACHES]->(skill:Skill)

      RETURN
        path.name AS name,
        path.level AS level,
        collect(DISTINCT skill.name) AS skills

      ORDER BY path.name
    `);

    const learningPaths = result.records.map((record) => ({
      name: record.get("name"),
      level: record.get("level"),
      skills: record.get("skills"),
    }));

    res.json({
      success: true,
      count: learningPaths.length,
      learningPaths,
    });
  } catch (error) {
    console.error("Failed to fetch learning paths:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch learning paths",
    });
  } finally {
    await session.close();
  }
});

export default router;
