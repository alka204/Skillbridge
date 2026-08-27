import driver from "../config/database.js";

const session = driver.session();

async function seedDatabase() {
  try {
    console.log("🌱 Starting SkillBridge database seed...");

    // Clear existing database
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("🗑️ Existing data cleared.");

    // -------------------------
    // CREATE SKILLS
    // -------------------------
    await session.run(`
      CREATE
        (:Skill {name: "JavaScript"}),
        (:Skill {name: "React"}),
        (:Skill {name: "Node.js"}),
        (:Skill {name: "Express.js"}),
        (:Skill {name: "MongoDB"}),
        (:Skill {name: "Python"}),
        (:Skill {name: "FastAPI"}),
        (:Skill {name: "AWS"}),
        (:Skill {name: "Docker"}),
        (:Skill {name: "Kubernetes"}),
        (:Skill {name: "SQL"}),
        (:Skill {name: "Git"}),
        (:Skill {name: "TypeScript"}),
        (:Skill {name: "Next.js"}),
        (:Skill {name: "Machine Learning"})
    `);

    console.log("🧠 Skills created.");

    // -------------------------
    // CREATE COMPANIES
    // -------------------------
    await session.run(`
      CREATE
        (:Company {name: "TechNova"}),
        (:Company {name: "CloudWorks"}),
        (:Company {name: "DataSphere"}),
        (:Company {name: "InnovateLabs"}),
        (:Company {name: "CodeCraft"})
    `);

    console.log("🏢 Companies created.");

    // -------------------------
    // CREATE PEOPLE
    // -------------------------
    await session.run(`
      CREATE
        (:Person {
          name: "Alka",
          role: "Full Stack Developer",
          experience: 1
        }),
        (:Person {
          name: "Rahul",
          role: "Backend Developer",
          experience: 3
        }),
        (:Person {
          name: "Priya",
          role: "Frontend Developer",
          experience: 2
        }),
        (:Person {
          name: "Arjun",
          role: "Cloud Engineer",
          experience: 4
        }),
        (:Person {
          name: "Neha",
          role: "Data Scientist",
          experience: 3
        }),
        (:Person {
          name: "Rohan",
          role: "DevOps Engineer",
          experience: 5
        }),
        (:Person {
          name: "Simran",
          role: "Software Engineer",
          experience: 2
        }),
        (:Person {
          name: "Vikash",
          role: "Machine Learning Engineer",
          experience: 4
        })
    `);

    console.log("👥 People created.");

    // -------------------------
    // CREATE LEARNING PATHS
    // -------------------------
    await session.run(`
      CREATE
        (:LearningPath {
          name: "Full Stack Web Development",
          level: "Intermediate"
        }),
        (:LearningPath {
          name: "Cloud Engineering with AWS",
          level: "Intermediate"
        }),
        (:LearningPath {
          name: "DevOps Engineering",
          level: "Advanced"
        }),
        (:LearningPath {
          name: "Machine Learning Fundamentals",
          level: "Beginner"
        }),
        (:LearningPath {
          name: "Modern Frontend Development",
          level: "Intermediate"
        })
    `);

    console.log("📚 Learning paths created.");

    // -------------------------
    // PERSON → SKILLS
    // -------------------------
    await session.run(`
      MATCH
        (alka:Person {name: "Alka"}),
        (rahul:Person {name: "Rahul"}),
        (priya:Person {name: "Priya"}),
        (arjun:Person {name: "Arjun"}),
        (neha:Person {name: "Neha"}),
        (rohan:Person {name: "Rohan"}),
        (simran:Person {name: "Simran"}),
        (vikash:Person {name: "Vikash"}),

        (javascript:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (node:Skill {name: "Node.js"}),
        (express:Skill {name: "Express.js"}),
        (mongodb:Skill {name: "MongoDB"}),
        (python:Skill {name: "Python"}),
        (fastapi:Skill {name: "FastAPI"}),
        (aws:Skill {name: "AWS"}),
        (docker:Skill {name: "Docker"}),
        (kubernetes:Skill {name: "Kubernetes"}),
        (sql:Skill {name: "SQL"}),
        (git:Skill {name: "Git"}),
        (typescript:Skill {name: "TypeScript"}),
        (nextjs:Skill {name: "Next.js"}),
        (ml:Skill {name: "Machine Learning"})

      CREATE
        (alka)-[:HAS_SKILL]->(javascript),
        (alka)-[:HAS_SKILL]->(react),
        (alka)-[:HAS_SKILL]->(node),
        (alka)-[:HAS_SKILL]->(mongodb),
        (alka)-[:HAS_SKILL]->(git),

        (rahul)-[:HAS_SKILL]->(node),
        (rahul)-[:HAS_SKILL]->(express),
        (rahul)-[:HAS_SKILL]->(mongodb),
        (rahul)-[:HAS_SKILL]->(docker),

        (priya)-[:HAS_SKILL]->(javascript),
        (priya)-[:HAS_SKILL]->(react),
        (priya)-[:HAS_SKILL]->(typescript),
        (priya)-[:HAS_SKILL]->(nextjs),

        (arjun)-[:HAS_SKILL]->(aws),
        (arjun)-[:HAS_SKILL]->(docker),
        (arjun)-[:HAS_SKILL]->(kubernetes),
        (arjun)-[:HAS_SKILL]->(git),

        (neha)-[:HAS_SKILL]->(python),
        (neha)-[:HAS_SKILL]->(sql),
        (neha)-[:HAS_SKILL]->(ml),

        (rohan)-[:HAS_SKILL]->(aws),
        (rohan)-[:HAS_SKILL]->(docker),
        (rohan)-[:HAS_SKILL]->(kubernetes),

        (simran)-[:HAS_SKILL]->(javascript),
        (simran)-[:HAS_SKILL]->(typescript),
        (simran)-[:HAS_SKILL]->(react),

        (vikash)-[:HAS_SKILL]->(python),
        (vikash)-[:HAS_SKILL]->(ml),
        (vikash)-[:HAS_SKILL]->(fastapi)
    `);

    console.log("🔗 Person skills connected.");

    // -------------------------
    // LEARNING GOALS
    // -------------------------
    await session.run(`
      MATCH
        (alka:Person {name: "Alka"}),
        (rahul:Person {name: "Rahul"}),
        (priya:Person {name: "Priya"}),
        (simran:Person {name: "Simran"}),

        (aws:Skill {name: "AWS"}),
        (docker:Skill {name: "Docker"}),
        (python:Skill {name: "Python"}),
        (nextjs:Skill {name: "Next.js"})

      CREATE
        (alka)-[:WANTS_TO_LEARN]->(aws),
        (alka)-[:WANTS_TO_LEARN]->(docker),

        (rahul)-[:WANTS_TO_LEARN]->(aws),

        (priya)-[:WANTS_TO_LEARN]->(nextjs),

        (simran)-[:WANTS_TO_LEARN]->(python)
    `);

    console.log("🎯 Learning goals created.");

    // -------------------------
    // MENTOR RELATIONSHIPS
    // -------------------------
    await session.run(`
      MATCH
        (alka:Person {name: "Alka"}),
        (rahul:Person {name: "Rahul"}),
        (priya:Person {name: "Priya"}),
        (arjun:Person {name: "Arjun"}),
        (neha:Person {name: "Neha"}),
        (rohan:Person {name: "Rohan"}),
        (vikash:Person {name: "Vikash"})

      CREATE
        (rahul)-[:MENTORS]->(alka),
        (priya)-[:MENTORS]->(alka),
        (arjun)-[:MENTORS]->(rahul),
        (neha)-[:MENTORS]->(simran),
        (rohan)-[:MENTORS]->(alka),
        (vikash)-[:MENTORS]->(neha)
    `);

    console.log("🤝 Mentor relationships created.");

    // -------------------------
    // WORKS_AT RELATIONSHIPS
    // -------------------------
    await session.run(`
      MATCH
        (alka:Person {name: "Alka"}),
        (rahul:Person {name: "Rahul"}),
        (priya:Person {name: "Priya"}),
        (arjun:Person {name: "Arjun"}),
        (neha:Person {name: "Neha"}),
        (rohan:Person {name: "Rohan"}),
        (simran:Person {name: "Simran"}),
        (vikash:Person {name: "Vikash"}),

        (technova:Company {name: "TechNova"}),
        (cloudworks:Company {name: "CloudWorks"}),
        (datasphere:Company {name: "DataSphere"}),
        (innovatelabs:Company {name: "InnovateLabs"}),
        (codecraft:Company {name: "CodeCraft"})

      CREATE
        (alka)-[:WORKS_AT]->(technova),
        (rahul)-[:WORKS_AT]->(codecraft),
        (priya)-[:WORKS_AT]->(technova),
        (arjun)-[:WORKS_AT]->(cloudworks),
        (neha)-[:WORKS_AT]->(datasphere),
        (rohan)-[:WORKS_AT]->(cloudworks),
        (simran)-[:WORKS_AT]->(innovatelabs),
        (vikash)-[:WORKS_AT]->(datasphere)
    `);

    console.log("🏢 Work relationships created.");

    // -------------------------
    // RELATED SKILLS
    // -------------------------
    await session.run(`
      MATCH
        (javascript:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (node:Skill {name: "Node.js"}),
        (express:Skill {name: "Express.js"}),
        (mongodb:Skill {name: "MongoDB"}),
        (python:Skill {name: "Python"}),
        (fastapi:Skill {name: "FastAPI"}),
        (aws:Skill {name: "AWS"}),
        (docker:Skill {name: "Docker"}),
        (kubernetes:Skill {name: "Kubernetes"}),
        (typescript:Skill {name: "TypeScript"}),
        (nextjs:Skill {name: "Next.js"}),
        (ml:Skill {name: "Machine Learning"})

      CREATE
        (javascript)-[:RELATED_TO]->(react),
        (javascript)-[:RELATED_TO]->(node),
        (typescript)-[:RELATED_TO]->(javascript),
        (react)-[:RELATED_TO]->(nextjs),
        (node)-[:RELATED_TO]->(express),
        (node)-[:RELATED_TO]->(mongodb),
        (python)-[:RELATED_TO]->(fastapi),
        (python)-[:RELATED_TO]->(ml),
        (aws)-[:RELATED_TO]->(docker),
        (docker)-[:RELATED_TO]->(kubernetes),
        (aws)-[:RELATED_TO]->(kubernetes)
    `);

    console.log("🧩 Skill relationships created.");

    // -------------------------
    // LEARNING PATH → SKILLS
    // -------------------------
    await session.run(`
      MATCH
        (fullstack:LearningPath {name: "Full Stack Web Development"}),
        (cloud:LearningPath {name: "Cloud Engineering with AWS"}),
        (devops:LearningPath {name: "DevOps Engineering"}),
        (mlpath:LearningPath {name: "Machine Learning Fundamentals"}),
        (frontend:LearningPath {name: "Modern Frontend Development"}),

        (javascript:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (node:Skill {name: "Node.js"}),
        (express:Skill {name: "Express.js"}),
        (mongodb:Skill {name: "MongoDB"}),
        (aws:Skill {name: "AWS"}),
        (docker:Skill {name: "Docker"}),
        (kubernetes:Skill {name: "Kubernetes"}),
        (python:Skill {name: "Python"}),
        (ml:Skill {name: "Machine Learning"}),
        (typescript:Skill {name: "TypeScript"}),
        (nextjs:Skill {name: "Next.js"})

      CREATE
        (fullstack)-[:TEACHES]->(javascript),
        (fullstack)-[:TEACHES]->(react),
        (fullstack)-[:TEACHES]->(node),
        (fullstack)-[:TEACHES]->(express),
        (fullstack)-[:TEACHES]->(mongodb),

        (cloud)-[:TEACHES]->(aws),
        (cloud)-[:TEACHES]->(docker),

        (devops)-[:TEACHES]->(docker),
        (devops)-[:TEACHES]->(kubernetes),

        (mlpath)-[:TEACHES]->(python),
        (mlpath)-[:TEACHES]->(ml),

        (frontend)-[:TEACHES]->(react),
        (frontend)-[:TEACHES]->(typescript),
        (frontend)-[:TEACHES]->(nextjs)
    `);

    console.log("📖 Learning paths connected.");

    // -------------------------
    // FINAL COUNTS
    // -------------------------
    const nodeResult = await session.run(`
      MATCH (n)
      RETURN count(n) AS totalNodes
    `);

    const relationshipResult = await session.run(`
      MATCH ()-[r]->()
      RETURN count(r) AS totalRelationships
    `);

    console.log(`\n✅ Seed completed successfully!`);

    console.log(
      `📊 Total nodes: ${nodeResult.records[0].get("totalNodes").toNumber()}`,
    );

    console.log(
      `🔗 Total relationships: ${relationshipResult.records[0].get("totalRelationships").toNumber()}`,
    );
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();
