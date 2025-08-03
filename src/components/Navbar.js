import { NavLink } from "react-router-dom";
import { useState, useEffect, use } from "react";

function Navbar() {
    const [mode, setMode] = useState(localStorage.getItem("theme") || "light");


    useEffect(() => {
        document.body.classList.add(`${mode}-mode`);
    }, [mode]);

    const toggleTheme = () => {
        const newMode = mode === "dark" ? "light" : "dark";
        setMode(newMode);

        const body = document.body;
        localStorage.setItem("theme", newMode);
        body.classList.remove("light-mode", "dark-mode");
        body.classList.add(`${newMode}-mode`);
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">iNote Book</NavLink>
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
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                to="/about"
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <button className="theme-toggle me-3" onClick={toggleTheme} aria-label="Toggle theme">
                            <i className={mode === "dark" ? "bi bi-sun" : "bi bi-moon-stars"}></i>
                        </button>
                        <NavLink className="btn btn-outline-light" to="/login">
                            Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;