import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPerson } from "../services/api";

function PersonProfile() {
  const { name } = useParams();

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPerson() {
      try {
        setLoading(true);
        setError("");

        const data = await getPerson(name);

        if (!data.success || !data.person) {
          throw new Error("Person not found");
        }

        setPerson(data.person);
      } catch (err) {
        console.error(err);
        setError("Unable to load this person's profile.");
      } finally {
        setLoading(false);
      }
    }

    loadPerson();
  }, [name]);

  if (loading) {
    return <div className="state">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="page">
        <div className="profile-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <Link to="/people" className="secondary-button">
            ← Back to People
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page profile-page">
      <Link to="/people" className="back-link">
        ← Back to People
      </Link>

      <section className="profile-header">
        <div className="large-avatar">{person.name.charAt(0)}</div>

        <div>
          <span className="eyebrow">PROFILE</span>

          <h1>{person.name}</h1>

          <p className="profile-role">{person.role}</p>

          <p className="experience">
            {person.experience} year
            {person.experience !== 1 ? "s" : ""} experience
          </p>
        </div>
      </section>

      <section className="profile-grid">
        {/* Current Skills */}
        <div className="profile-card">
          <div className="card-label">CURRENT SKILLS</div>

          <h2>What I already know</h2>

          <div className="tag-list">
            {person.skills.map((skill) => (
              <span className="skill-tag" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div className="profile-card">
          <div className="card-label">LEARNING GOALS</div>

          <h2>What I want to learn</h2>

          <div className="tag-list">
            {person.learningGoals.map((goal) => (
              <span className="goal-tag" key={goal}>
                {goal}
              </span>
            ))}
          </div>
        </div>

        {/* Company */}
        <div className="profile-card">
          <div className="card-label">EXPERIENCE</div>

          <h2>Works at</h2>

          <div className="company-list">
            {person.companies.map((company) => (
              <div className="company-item" key={company}>
                <span className="company-dot"></span>
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor CTA */}
      <section className="mentor-cta">
        <div>
          <span className="eyebrow">GRAPH-POWERED DISCOVERY</span>

          <h2>Looking for someone who can help you grow?</h2>

          <p>Find mentors whose skills match what you're trying to learn.</p>
        </div>

        <Link
          to={`/people/${encodeURIComponent(person.name)}/mentors`}
          className="primary-button"
        >
          Find My Mentors →
        </Link>
      </section>
    </div>
  );
}

export default PersonProfile;
