import React from "react";
import "../styles/team.css";
import frontendImg from "../assets/srijita-image.jpg";
import backendImg from "../assets/swarnima.jpg";
import MlImg from "../assets/akanksha.jpg";
import UIImg from "../assets/garima.jpg"

const teamMembers = [
  {
    role: "UI/UX Designer",
    name: "Garima Sharma",
    image:UIImg,
    description:
      "Responsible for creating intuitive user interfaces and ensuring a smooth user experience across the app.",
  },
  {
    role: "Frontend Developer",
    name: "Srijita Gupta",
    image: frontendImg,
    description:
      "Builds and maintains the user-facing portion of the app using React and CSS.",
  },
  {
    role: "Machine Learning Engineer",
    name: "Akanksha Rawal",
    image: MlImg,
    description:
      "Develops and integrates ML models to support predictions and analytics within the app.",
  },
  {
    role: "Backend Developer",
    name: "Swarnima Dwivedi",
    image: backendImg,
    description:
      "Manages the server, APIs, and database operations to support seamless communication between frontend and ML services.",
  },
];

export default function Team() {
  return (
    <div className="team-container">
      <h2 className="team-title">Meet the Team</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img
              src={member.image}
              alt={member.name}
              className="team-image"
            />
            <h3 className="team-role">{member.role}</h3>
            <p className="team-name">{member.name}</p>
            <p className="team-description">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
