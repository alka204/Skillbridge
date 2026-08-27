import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPeople } from "../services/api";

function People() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPeople() {
      try {
        const data = await getPeople();
        setPeople(data.people);
      } catch {
        setError("Unable to load people.");
      } finally {
        setLoading(false);
      }
    }

    loadPeople();
  }, []);

  if (loading) {
    return <div className="state">Loading people...</div>;
  }

  if (error) {
    return <div className="state error-state">{error}</div>;
  }

  return (
    <div className="page">
      <section className="page-header">
        <span className="eyebrow">NETWORK</span>

        <h1>People</h1>

        <p>
          Explore people in the SkillBridge network and discover who can help
          you grow.
        </p>
      </section>

      <div className="people-grid">
        {people.map((person) => (
          <Link
            to={`/people/${encodeURIComponent(person.name)}`}
            className="person-card"
            key={person.name}
          >
            <div className="avatar">{person.name.charAt(0)}</div>

            <div>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
              <span>{person.experience} years experience</span>
            </div>

            <div className="card-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default People;
