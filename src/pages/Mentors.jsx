import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMentors } from "../services/api";

function Mentors() {
  const { name } = useParams();

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMentors() {
      try {
        setLoading(true);
        setError("");
        setMessage("");

        const data = await getMentors(name);

        if (!data.success) {
          throw new Error("Unable to find mentors");
        }

        setMentors(data.mentors || []);
        setMessage(data.message || "");
      } catch (err) {
        console.error(err);
        setError("Unable to load mentor recommendations.");
      } finally {
        setLoading(false);
      }
    }

    loadMentors();
  }, [name]);

  if (loading) {
    return <div className="state">Finding mentors...</div>;
  }

  if (error) {
    return (
      <div className="page">
        <div className="profile-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>

          <Link
            to={`/people/${encodeURIComponent(name)}`}
            className="secondary-button"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to={`/people/${encodeURIComponent(name)}`} className="back-link">
        ← Back to Profile
      </Link>

      <section className="page-header">
        <span className="eyebrow">GRAPH-POWERED DISCOVERY</span>

        <h1>Mentor Matches</h1>

        <p>
          People in the SkillBridge network whose skills connect with what{" "}
          {name} wants to learn.
        </p>
      </section>

      {mentors.length === 0 ? (
        <div className="empty-state">
          <h2>No mentor matches yet</h2>
          <p>We couldn't find someone with a matching skill relationship.</p>

          {message && <p className="empty-message">{message}</p>}
        </div>
      ) : (
        <>
          <div className="people-grid">
            {mentors.map((mentor) => (
              <div className="person-card mentor-card" key={mentor.mentor}>
                <div className="avatar">{mentor.mentor.charAt(0)}</div>

                <div>
                  <h3>{mentor.mentor}</h3>

                  <p>{mentor.role}</p>

                  <span>
                    {mentor.experience} year
                    {mentor.experience !== 1 ? "s" : ""} experience
                  </span>

                  {/* Why this person is a match */}
                  <div className="mentor-skills">
                    <small>WHY THIS IS A MATCH</small>

                    {mentor.learningGoal?.length > 0 && (
                      <div>
                        <small>LEARNING GOAL</small>

                        <div className="tag-list">
                          {mentor.learningGoal.map((goal) => (
                            <span className="goal-tag" key={goal}>
                              {goal}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {mentor.matchingSkill?.length > 0 && (
                      <div>
                        <small>MATCHING SKILLS</small>

                        <div className="tag-list">
                          {mentor.matchingSkill.map((skill) => (
                            <span className="skill-tag" key={skill}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  to={`/people/${encodeURIComponent(mentor.mentor)}`}
                  className="card-arrow"
                >
                  →
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Mentors;
