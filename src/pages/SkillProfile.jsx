import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSkill } from "../services/api";

function SkillProfile() {
  const { name } = useParams();

  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSkill() {
      try {
        setLoading(true);
        setError("");

        const data = await getSkill(name);

        if (!data.success || !data.skill) {
          throw new Error("Skill not found");
        }

        setSkill(data.skill);
      } catch (err) {
        console.error(err);
        setError("Unable to load this skill.");
      } finally {
        setLoading(false);
      }
    }

    loadSkill();
  }, [name]);

  if (loading) {
    return <div className="state">Loading skill...</div>;
  }

  if (error) {
    return (
      <div className="page">
        <div className="profile-error">
          <h2>Something went wrong</h2>

          <p>{error}</p>

          <Link to="/skills" className="secondary-button">
            ← Back to Skills
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page profile-page">
      <Link to="/skills" className="back-link">
        ← Back to Skills
      </Link>

      <section className="profile-header">
        <div className="large-avatar">{skill.name.charAt(0)}</div>

        <div>
          <span className="eyebrow">SKILL EXPLORER</span>

          <h1>{skill.name}</h1>

          <p className="profile-role">
            Explore people and skills connected to {skill.name}.
          </p>
        </div>
      </section>

      <section className="profile-grid">
        {/* People */}
        <div className="profile-card">
          <div className="card-label">PEOPLE</div>

          <h2>People with this skill</h2>

          <div className="tag-list">
            {skill.people.length > 0 ? (
              skill.people.map((person) => (
                <span className="skill-tag" key={person}>
                  {person}
                </span>
              ))
            ) : (
              <span className="no-connections">No people found</span>
            )}
          </div>
        </div>

        {/* Related Skills */}
        <div className="profile-card">
          <div className="card-label">RELATED SKILLS</div>

          <h2>Skills connected to {skill.name}</h2>

          <div className="tag-list">
            {skill.relatedSkills.length > 0 ? (
              skill.relatedSkills.map((relatedSkill) => (
                <span className="skill-tag" key={relatedSkill}>
                  {relatedSkill}
                </span>
              ))
            ) : (
              <span className="no-connections">No related skills yet</span>
            )}
          </div>
        </div>

        {/* Connected Network */}
        <div className="profile-card">
          <div className="card-label">NETWORK</div>

          <h2>Connected skills</h2>

          <div className="tag-list">
            {skill.connectedSkills.map((connectedSkill) => (
              <span className="goal-tag" key={connectedSkill}>
                {connectedSkill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mentor-cta">
        <div>
          <span className="eyebrow">GRAPH-POWERED DISCOVERY</span>

          <h2>Explore the skill network</h2>

          <p>Discover how people and skills connect across SkillBridge.</p>
        </div>

        <Link to="/people" className="primary-button">
          Explore People →
        </Link>
      </section>
    </div>
  );
}

export default SkillProfile;
