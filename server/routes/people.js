import express from "express";
import driver from "../config/database.js";

const router = express.Router();

// GET /api/people
router.get("/", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (person:Person)

      OPTIONAL MATCH (person)-[:HAS_SKILL]->(skill:Skill)
      OPTIONAL MATCH (person)-[:WANTS_TO_LEARN]->(goal:Skill)
      OPTIONAL MATCH (person)-[:WORKS_AT]->(company:Company)

      RETURN
        person.name AS name,
        person.role AS role,
        person.experience AS experience,
        collect(DISTINCT skill.name) AS skills,
        collect(DISTINCT goal.name) AS learningGoals,
        collect(DISTINCT company.name) AS companies

      ORDER BY person.name
    `);

    const people = result.records.map((record) => {
      const experience = record.get("experience");

      return {
        name: record.get("name"),
        role: record.get("role"),
        experience:
          experience && typeof experience.toNumber === "function"
            ? experience.toNumber()
            : experience,
        skills: record.get("skills").filter(Boolean),
        learningGoals: record.get("learningGoals").filter(Boolean),
        companies: record.get("companies").filter(Boolean),
      };
    });

    res.json({
      success: true,
      count: people.length,
      people,
    });
  } catch (error) {
    console.error("Failed to fetch people:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load people",
    });
  } finally {
    await session.close();
  }
});

// GET /api/people/:name
router.get("/:name", async (req, res) => {
  const session = driver.session();
  const { name } = req.params;

  try {
    const result = await session.run(
      `
      MATCH (person:Person {name: $personName})

      OPTIONAL MATCH (person)-[:HAS_SKILL]->(skill:Skill)
      OPTIONAL MATCH (person)-[:WANTS_TO_LEARN]->(goal:Skill)
      OPTIONAL MATCH (person)-[:WORKS_AT]->(company:Company)

      RETURN
        person.name AS name,
        person.role AS role,
        person.experience AS experience,
        collect(DISTINCT skill.name) AS skills,
        collect(DISTINCT goal.name) AS learningGoals,
        collect(DISTINCT company.name) AS companies
      `,
      {
        personName: name,
      },
    );

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Person not found",
      });
    }

    const record = result.records[0];
    const experience = record.get("experience");

    const person = {
      name: record.get("name"),
      role: record.get("role"),
      experience:
        experience && typeof experience.toNumber === "function"
          ? experience.toNumber()
          : experience,
      skills: record.get("skills").filter(Boolean),
      learningGoals: record.get("learningGoals").filter(Boolean),
      companies: record.get("companies").filter(Boolean),
    };

    res.json({
      success: true,
      person,
    });
  } catch (error) {
    console.error("Failed to fetch person:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load person",
    });
  } finally {
    await session.close();
  }
});

// GET /api/people/:name/mentors
router.get("/:name/mentors", async (req, res) => {
  const session = driver.session();
  const { name } = req.params;

  try {
    const result = await session.run(
      `
      MATCH (learner:Person {name: $personName})
            -[:WANTS_TO_LEARN]->(wanted:Skill)
            -[:RELATED_TO]->(related:Skill)
            <-[:HAS_SKILL]-(mentor:Person)

      WHERE learner <> mentor

      RETURN
        mentor.name AS mentor,
        mentor.role AS role,
        mentor.experience AS experience,
        collect(DISTINCT wanted.name) AS learningGoals,
        collect(DISTINCT related.name) AS matchingSkills

      ORDER BY mentor.name
      `,
      {
        personName: name,
      },
    );

    if (result.records.length === 0) {
      return res.json({
        success: true,
        count: 0,
        mentors: [],
        message: "No matching mentors found",
      });
    }

    const mentors = result.records.map((record) => ({
      mentor: record.get("mentor"),
      role: record.get("role"),
      experience: record.get("experience").toNumber(),
      learningGoal: record.get("learningGoals"),
      matchingSkill: record.get("matchingSkills"),
    }));

    res.json({
      success: true,
      count: mentors.length,
      mentors,
    });
  } catch (error) {
    console.error("Failed to find mentors:", error);

    res.status(500).json({
      success: false,
      message: "Unable to find mentors",
    });
  } finally {
    await session.close();
  }
});

export default router;
