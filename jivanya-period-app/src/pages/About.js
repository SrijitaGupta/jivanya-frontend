import React from "react";
import "../styles/About.css";
import AboutLogo from "../assets/about-logo.jpg";
import AboutIllustration from "../assets/about-illustration.jpg";
import AboutImg from "../assets/girl-with-flowers.jpg";

const About = () => {
  return (
    <div
      className="about-container"
      style={{ fontFamily: "sans-serif", padding: "2rem", backgroundColor: "#ffeaf2" }}
    >
      <header style={{ textAlign: "center", marginBottom: "2rem", maxWidth: "900px", marginLeft: "auto", marginRight: "auto" }}>
        <img src={AboutImg} alt="Logo" style={{ height: "60px" }} />
        <h2 style={{ color: "#c6366c" }}>About Us</h2>
        <h1>Empowering Women, Naturally</h1>
        <p>A space where menstrual care is gentle, informed, and celebrated.</p>
      </header>

      <section className="who-we-are" style={{ marginBottom: "2rem", maxWidth: "900px", marginLeft: "auto", marginRight: "auto" }}>
        <h3 style={{ color: "#c6366c" }}>Who We Are?</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img src={AboutLogo} alt="Illustration" style={{ height: "80px" }} />
          <p>
            We're <strong>Jivanya</strong> — your gentle guide through every period.
            <br />
            Because understanding your body should feel natural.
          </p>
        </div>
      </section>

      <section
        className="mission-vision"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          className="mission-box"
          style={{
            backgroundColor: "#fff",
            padding: "1rem",
            border: "1px solid #c6366c",
            borderRadius: "8px",
            flex: 1,
          }}
        >
          <h4>🌸 Our Mission</h4>
          <p>We want every girl to feel confident, informed, and never alone on her period journey.</p>
        </div>
        <div
          className="vision-box"
          style={{
            backgroundColor: "#fff",
            padding: "1rem",
            border: "1px solid #c6366c",
            borderRadius: "8px",
            flex: 1,
          }}
        >
          <h4>🌙 Our Vision</h4>
          <p>Awareness. Access. Acceptance.</p>
        </div>
      </section>

      {/* Values section: card and image side by side filling full width */}
      <section
        className="values-section"
        style={{
          marginTop: "2rem",
          display: "flex",
          gap: "1rem",
          width: "100%",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "stretch",
        }}
      >
        <div
          className="values-card"
          style={{
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(198, 54, 108, 0.2)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <h3 style={{ color: "#c6366c", marginBottom: "1rem" }}>Our Values</h3>
          <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0, fontSize: "1.1rem", lineHeight: 1.6 }}>
            <li>🫶 <strong>Empathy</strong> — We listen without judgment</li>
            <li>📚 <strong>Education</strong> — Knowledge is power</li>
            <li>🤝 <strong>Support</strong> — You’re never alone</li>
            <li>🗣️ <strong>Openness</strong> — No more whispers, just real talk</li>
          </ul>
        </div>
        <img
          src={AboutIllustration}
          alt="Girl with flowers"
          style={{
            flex: 1,
            borderRadius: "12px",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            minWidth: 0,
            display: "block",
          }}
        />
      </section>
    </div>
  );
};

export default About;
