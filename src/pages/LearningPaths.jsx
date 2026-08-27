import { useEffect, useState } from "react";

import { getLearningPaths } from "../services/api";

function LearningPaths() {
  const [learningPaths, setLearningPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLearningPaths() {
      try {
        setLoading(true);
        setError("");

        const data = await getLearningPaths();

        if (!data.success) {
          throw new Error("Unable to load learning paths");
        }

        setLearningPaths(data.learningPaths || []);
      } catch (err) {
        console.error("Failed to load learning paths:", err);
        setError("Unable to load learning paths.");
      } finally {
        setLoading(false);
      }
    }

    fetchLearningPaths();
  }, []);

  return (
    <div className="page">
      <section className="page-header">
        <span className="eyebrow">LEARNING</span>

        <h1>Learning Paths</h1>

        <p>Explore structured learning paths built around connected skills.</p>
      </section>

      {loading && <div className="state">Loading learning paths...</div>}

      {error && !loading && <div className="state error-state">{error}</div>}

      {!loading && !error && learningPaths.length === 0 && (
        <div className="empty-placeholder">
          <h2>No learning paths yet</h2>
          <p>There are currently no learning paths available.</p>
        </div>
      )}

      {!loading && !error && learningPaths.length > 0 && (
        <section className="learning-path-grid">
          {learningPaths.map((path) => (
            <article className="learning-path-card" key={path.name}>
              <div className="path-top">
                <span className="path-level">{path.level}</span>
              </div>

              <h2>{path.name}</h2>

              <div className="card-label">SKILLS COVERED</div>

              <div className="tag-list">
                {path.skills && path.skills.length > 0 ? (
                  path.skills.map((skill) => (
                    <span className="skill-tag" key={skill}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="no-connections">No skills listed yet</span>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default LearningPaths;
