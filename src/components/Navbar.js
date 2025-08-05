import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
    document.body.classList.toggle("dark-mode", newMode === "dark");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">iNoteBook</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            <button
              className="theme-toggle btn btn-icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <i className={mode === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill"}></i>
            </button>
            <NavLink className="btn btn-primary btn-sm" to="/login">
              Login
            </NavLink>

            <NavLink className="btn btn-primary btn-sm" to="/signup">
              Singup
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;