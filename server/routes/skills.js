import express from "express";
import driver from "../config/database.js";

const router = express.Router();

// GET /api/skills
// Get all skills with people count and related skills
router.get("/", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (skill:Skill)

      OPTIONAL MATCH (person:Person)-[:HAS_SKILL]->(skill)

      OPTIONAL MATCH (skill)-[:RELATED_TO]->(related:Skill)

      RETURN
        skill.name AS name,
        count(DISTINCT person) AS peopleCount,
        collect(DISTINCT related.name) AS relatedSkills

      ORDER BY skill.name
    `);

    const skills = result.records.map((record) => {
      const peopleCount = record.get("peopleCount");

      return {
        name: record.get("name"),
        peopleCount:
          peopleCount && typeof peopleCount.toNumber === "function"
            ? peopleCount.toNumber()
            : peopleCount,
        relatedSkills: record.get("relatedSkills").filter(Boolean),
      };
    });

    res.json({
      success: true,
      count: skills.length,
      skills,
    });
  } catch (error) {
    console.error("Failed to fetch skills:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch skills",
    });
  } finally {
    await session.close();
  }
});

// GET /api/skills/:name
// Get details of one skill
router.get("/:name", async (req, res) => {
  const session = driver.session();
  const { name } = req.params;

  try {
    const result = await session.run(
      `
      MATCH (skill:Skill {name: $skillName})

      OPTIONAL MATCH (person:Person)-[:HAS_SKILL]->(skill)

      OPTIONAL MATCH (skill)-[:RELATED_TO]->(related:Skill)

      OPTIONAL MATCH (person)-[:HAS_SKILL]->(personSkill:Skill)

      RETURN
        skill.name AS name,
        collect(DISTINCT person.name) AS people,
        collect(DISTINCT related.name) AS relatedSkills,
        collect(DISTINCT personSkill.name) AS connectedSkills
      `,
      {
        skillName: name,
      },
    );

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    const record = result.records[0];

    const skill = {
      name: record.get("name"),
      people: record.get("people").filter(Boolean),
      relatedSkills: record.get("relatedSkills").filter(Boolean),
      connectedSkills: record.get("connectedSkills").filter(Boolean),
    };

    res.json({
      success: true,
      skill,
    });
  } catch (error) {
    console.error("Failed to fetch skill:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load skill",
    });
  } finally {
    await session.close();
  }
});

export default router;
