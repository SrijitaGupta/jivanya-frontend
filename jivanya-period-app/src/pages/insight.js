import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/insight.css";

// Import images
import crampsImg from "../assets/cramps_jivanya.jpg";
import weightImg from "../assets/weight_jivanya.jpg";
import nutritionImg from "../assets/nutrition_jivanya.jpg";
import fatigueImg from "../assets/fatiguetriggers.jpg";

// Insight content
const insights = [
  {
    title: "Understanding Cramps",
    image: crampsImg,
    link: "/cramps", // ✅ Added link field
  },
  {
    title: "Hormones and Your Weight",
    image: weightImg,
    link: "/Hormones",

  },
  {
    title: "Nourish to Flourish",
    image: nutritionImg,
  },
  {
    title: "Uncovering Fatigue Triggers",
    image: fatigueImg,
  },
];

const Insight = () => {
  const navigate = useNavigate();

  return (
    <div className="insight-page">
      <h2 className="insight-header">
        <i className="fas fa-lightbulb" style={{ marginRight: "0.5rem" }}></i>
        Insights
      </h2>

      <div className="insight-grid">
        {insights.map((item, index) => (
          <div
            className="insight-card"
            key={index}
            onClick={() => item.link && navigate(item.link)} // ✅ Click to navigate if link exists
            style={{ cursor: item.link ? "pointer" : "default" }}
          >
            <div className="insight-image-wrapper">
              <img src={item.image} alt={item.title} className="insight-image" />
            </div>
            <div className="insight-title-wrapper">
              <h3 className="insight-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insight;
