import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to iNote Book</h1>
        <p>Your notes, securely stored in the cloud. Access them anytime, anywhere.</p>
        <NavLink to="/signup" className="btn btn-custom">
          Get Started
        </NavLink>
      </div>
    </div>
  );
}

export default Home;