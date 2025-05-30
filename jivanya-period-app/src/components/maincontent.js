import React, { useEffect } from "react";
import '../styles/maincontent.css';
import homepageImage from '../assets/jivanyahomepage.jpg';

const Feature = ({ id, title, iconClass, text, position }) => {
  useEffect(() => {
    const feature = document.getElementById(id);
    if (feature) {
      feature.style.opacity = "1";
      feature.style.transform = "translateY(0)";
    }
  }, [id]);

  return (
    <div className={`feature ${position}`} id={id}>
      <h2>
        <i className={iconClass}></i> {title}
      </h2>
      <p>{text}</p>
    </div>
  );
};

const MainContent = () => {
  return (
    <section id="carousel">
      <Feature
        id="feature1"
        title="Personalised Goals"
        iconClass="fas fa-calendar-alt"
        text="Track your menstrual cycle with ease. Log your period dates and receive smart predictions for your next cycle."
        position="feature-left"
      />

      <div className="central-image">
        <img src={homepageImage} alt="Health Tracker" />
      </div>

      <Feature
        id="feature2"
        title="AI Health Tracker"
        iconClass="fas fa-robot"
        text="Get personalized health insights based on your symptoms, mood, and lifestyle. Your data, your health, your power!"
        position="feature-right"
      />

      <Feature
        id="feature3"
        title="Secret Community"
        iconClass="fas fa-users"
        text="Join a safe and supportive space where you can share experiences, ask questions, and connect with like-minded individuals."
        position="feature-left"
      />

      <Feature
        id="feature4"
        title="Insights"
        iconClass="fas fa-chart-line"
        text="Discover health trends, fertility predictions, and cycle patterns tailored to your unique body."
        position="feature-right"
      />
    </section>
  );
};

export default MainContent;
