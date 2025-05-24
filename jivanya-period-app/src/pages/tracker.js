import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tracker.css";

export default function Tracker() {
  const navigate = useNavigate();

  const handlePregnancyClick = () => {
    navigate("/pregnancy-questions");
  };

  const handleEndometriosisClick = () => {
    navigate("/endometriosis-questions");
  };

  const handlePCOSClick = () => {
    navigate("/pcos-questions");
  };

  const handleMensesScoreClick = () => {
    navigate("/menses-score");
  };

  const handleCervicalcancerClick = () => {
    navigate("/cervical-cancer");
  };

  const handleChatbotClick = () => {
    navigate("/chat-bot");
  };

  return (
    <div className="tracker-container-main">
      <h1 className="tracker-title-main">Health Tracker</h1>

      <div className="tracker-grid">
        <div className="tracker-card clickable" onClick={handlePregnancyClick}>
          <h2 className="tracker-card-title">Chances of Pregnancy</h2>
          <p className="tracker-card-sub">Click to answer questions</p>
        </div>

        <div className="tracker-card clickable" onClick={handleEndometriosisClick}>
          <h2 className="tracker-card-title">Endometriosis Detection</h2>
          <p className="tracker-card-sub">Click to answer questions</p>
        </div>

        <div className="tracker-card clickable" onClick={handlePCOSClick}>
          <h2 className="tracker-card-title">PCOS Detection</h2>
          <p className="tracker-card-sub">Click to answer questions</p>
        </div>

        <div className="tracker-card clickable" onClick={handleMensesScoreClick}>
          <h2 className="tracker-card-title">Menses Score</h2>
          <p className="tracker-card-sub">Click to calculate your score</p>
        </div>

        <div className="tracker-card clickable" onClick={handleCervicalcancerClick}>
          <h2 className="tracker-card-title">Cervical cancer Risk Assessment</h2>
          <p className="tracker-card-sub">Click to check</p>
        </div>

        <div className="tracker-card clickable" onClick={handleChatbotClick}>
          <h2 className="tracker-card-title">BloomBot</h2>
          <p className="tracker-card-sub">Click to get answers</p>
        </div>
      </div>
    </div>
  );
}
