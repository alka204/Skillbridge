import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStats } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    people: 0,
    skills: 0,
    learningPaths: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        setError("");

        const data = await getStats();

        if (!data.success) {
          throw new Error("Unable to load statistics");
        }

        setStats(data.stats);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
        setError("Unable to load network statistics.");
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="page dashboard">
      <section className="hero-section">
        <div className="hero-content">
          <span className="eyebrow">SKILL DISCOVERY PLATFORM</span>

          <h1>
            Build skills.
            <br />
            <span>Find your people.</span>
          </h1>

          <p>
            Discover mentors, explore skills, and find learning paths through
            the connections in the SkillBridge network.
          </p>

          <div className="hero-actions">
            <Link to="/people" className="primary-button">
              Find a Mentor
            </Link>

            <Link to="/learning-paths" className="secondary-button">
              Explore Learning Paths
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        {loading ? (
          <div className="state">Loading network statistics...</div>
        ) : error ? (
          <div className="state error-state">{error}</div>
        ) : (
          <>
            <div className="stat-card">
              <strong>{stats.people}</strong>
              <span>People</span>
            </div>

            <div className="stat-card">
              <strong>{stats.skills}</strong>
              <span>Skills</span>
            </div>

            <div className="stat-card">
              <strong>{stats.learningPaths}</strong>
              <span>Learning Paths</span>
            </div>
          </>
        )}
      </section>

      <section className="graph-intro">
        <span className="eyebrow">WHY A GRAPH?</span>

        <h2>Skills are connected, not isolated.</h2>

        <p>
          SkillBridge uses relationships between people, skills, companies, and
          learning paths to discover connections that would be difficult to
          model with simple lists.
        </p>
      </section>
    </div>
  );
}

export default Dashboard;
