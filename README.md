# SkillBridge

A graph-powered skill discovery and mentorship platform built with React, Express.js, and CognoDB.

SkillBridge helps users discover people, skills, mentors, companies, and structured learning paths by exploring the relationships between them.

Instead of treating skills and people as isolated records, SkillBridge models them as an interconnected graph. This makes it possible to discover relationships such as:

- People who have a particular skill
- Skills related to another skill
- People who want to learn a skill
- Mentors whose skills match another person's learning goals
- Learning paths connected to multiple skills
- Multi-hop relationships across people and skills

## 🚀 Live Demo

Frontend :https://skillbridge-three-phi.vercel.app/

Backend :https://skillbridge-6j2p.onrender.com/api/health

## 📌 Project Overview

SkillBridge is a skill discovery platform designed around a graph data model.

The platform contains:

- 👥 People
- 🧠 Skills
- 🏢 Companies
- 📚 Learning Paths
- 🎯 Learning Goals
- 🤝 Mentor Relationships
- 🔗 Skill Relationships

The application uses CognoDB as the graph database and Express.js as the backend API layer.

The React frontend consumes the backend APIs and presents the graph data through a simple, user-friendly interface.

## 💡 Why a Graph Database?

Skills are not isolated pieces of information.

For example:

- text
Alka
  │
  ├── HAS_SKILL ──→ React
  │                    │
  │                    └── RELATED_TO ──→ Next.js
  │
  └── WANTS_TO_LEARN ──→ AWS
                           │
                           └── RELATED_TO ──→ Docker