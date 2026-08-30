const API_BASE_URL = "https://skillbridge-6j2p.onrender.com/api";

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Something went wrong while fetching data");
  }

  return response.json();
}

export const getPeople = () => request("/people");

export const getPerson = (name) =>
  request(`/people/${encodeURIComponent(name)}`);

export const getMentors = (name) =>
  request(`/people/${encodeURIComponent(name)}/mentors`);

export const getSkills = () => request("/skills");

export const getSkill = (name) =>
  request(`/skills/${encodeURIComponent(name)}`);

export const getLearningPaths = () => request("/learning-paths");

export const getStats = () => request("/stats");
