import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import NoteContext from "../context/NoteContext";

function About() {
    const { name } = useContext(NoteContext);

    return (
        <div className="about-section">
            <h2>About iNote Book</h2>
            <p>
                iNote Book is a secure, cloud-based note-taking application designed to help
                you organize your thoughts and ideas effortlessly. Whether you're a student,
                professional, or creative, iNote Book keeps your notes safe and accessible
                across all your devices.
            </p>
            <p>
                <strong>Created by:</strong> {name || "Team iNote Book"}
            </p>
            <NavLink to="/" className="btn btn-custom">
                Back to Home
            </NavLink>
        </div>
    );
}

export default About;