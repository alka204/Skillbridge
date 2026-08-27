import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSkills } from "../services/api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data.skills || []);
      } catch (err) {
        console.error("Failed to load skills:", err);
        setError("Unable to load skills.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="page">
      <section className="page-header">
        <span className="eyebrow">SKILL NETWORK</span>

        <h1>Skills</h1>

        <p>
          Explore the skills and connections across the SkillBridge network.
        </p>
      </section>

      <section className="skills-grid">
        {loading && <p>Loading skills...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && skills.length === 0 && <p>No skills found.</p>}

        {!loading &&
          !error &&
          skills.map((skill) => (
            <Link
              to={`/skills/${encodeURIComponent(skill.name)}`}
              className="skill-card-link"
              key={skill.name}
            >
              <article className="skill-card">
                <h3>{skill.name}</h3>

                <p className="skill-people">
                  {skill.peopleCount}{" "}
                  {skill.peopleCount === 1 ? "person" : "people"}
                </p>

                <div className="skill-connections">
                  <span className="connection-label">Related skills</span>

                  {skill.relatedSkills.length > 0 ? (
                    <div className="related-skills">
                      {skill.relatedSkills.map((relatedSkill) => (
                        <span className="related-skill" key={relatedSkill}>
                          {relatedSkill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="no-connections">
                      No related skills yet
                    </span>
                  )}
                </div>

                <span className="skill-explore">Explore skill →</span>
              </article>
            </Link>
          ))}
      </section>
    </div>
  );
}

export default Skills;
