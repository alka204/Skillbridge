import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import People from "./pages/People";
import Mentors from "./pages/Mentors";
import PersonProfile from "./pages/PersonProfile";
import Skills from "./pages/Skills";
import SkillProfile from "./pages/SkillProfile";
import LearningPaths from "./pages/LearningPaths";

import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/people" element={<People />} />
            <Route path="/people/:name/mentors" element={<Mentors />} />
            <Route path="/people/:name" element={<PersonProfile />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/skills/:name" element={<SkillProfile />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
