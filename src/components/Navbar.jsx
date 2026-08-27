import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-icon">S</span>
          <span>SkillBridge</span>
        </NavLink>

        <nav>
          <NavLink to="/people">People</NavLink>
          <NavLink to="/skills">Skills</NavLink>
          <NavLink to="/learning-paths">Learning Paths</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
