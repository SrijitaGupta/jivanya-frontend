import React, { useState } from "react";
import axios from "axios";
import pregnancyImg from "../assets/pregnancychances.jpg";
import "../styles/pregnancychances.css";

const PregnancyQuestion = () => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    bmi: "",
    pulse: "",
    rr: "",
    hb: "",
    cycle: "",
    cycleLength: "",
    abortions: "",
    fsh: "",
    lh: "",
    fsh_lh: "",
    tsh: "",
    prl: "",
    prg: "",
    waist: "",
    hip: "",
    whr: "",
    vitD3: "",
    rbs: "",
    endometrium: "",
  });

  const [prediction, setPrediction] = useState("");
  const [probability, setProbability] = useState("");
  const [error, setError] = useState("");

  const questions = {
    age: "What's your age?",
    weight: "Enter your weight (kg):",
    height: "Enter your height (cm):",
    pulse: "What is your pulse rate?",
    rr: "Respiratory rate?",
    hb: "Hemoglobin level (g/dL)?",
    cycle: "Cycle type (Regular/Irregular)?",
    cycleLength: "Cycle length (in days)?",
    abortions: "Number of abortions?",
    fsh: "FSH level (mIU/mL)?",
    lh: "LH level (mIU/mL)?",
    tsh: "TSH level (mIU/L)?",
    prl: "PRL (Prolactin) level?",
    prg: "PRG (Progesterone) level?",
    waist: "Waist size (cm)?",
    hip: "Hip size (cm)?",
    vitD3: "Vitamin D3 level (ng/mL)?",
    rbs: "Random blood sugar (mg/dL)?",
    endometrium: "Endometrium thickness (mm)?",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    if (name === "height" || name === "weight") {
      const h = parseFloat(updated.height) / 100;
      const w = parseFloat(updated.weight);
      if (h && w) updated.bmi = (w / (h * h)).toFixed(2);
    }

    if (name === "fsh" || name === "lh") {
      const f = parseFloat(updated.fsh);
      const l = parseFloat(updated.lh);
      if (f && l) updated.fsh_lh = (f / l).toFixed(2);
    }

    if (name === "waist" || name === "hip") {
      const w = parseFloat(updated.waist);
      const h = parseFloat(updated.hip);
      if (w && h) updated.whr = (w / h).toFixed(2);
    }

    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction("");
    setProbability("");

    try {
      const res = await axios.post("https://web-production-82600.up.railway.app/predict", {
        features: formData,
      });
      setPrediction(res.data.prediction);
      setProbability(res.data.probability);
    } catch (err) {
      setError("Prediction failed. Please check your input.");
    }
  };

  return (
    <div className="menses-container">
      {/* Image section */}
      <div className="menses-left">
        <img src={pregnancyImg} alt="Pregnancy" className="menses-image" />
      </div>

      {/* Form section */}
      <div className="menses-right">
        <div className="form-container">
          <div className="chat-title">Pregnancy Prediction</div>
          <form onSubmit={handleSubmit} className="chat-form">
            <ul>
              {Object.entries(questions).map(([key, question]) => (
                <li key={key}>
                  <label>{question}</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder={`Enter ${key}`}
                  />
                </li>
              ))}
              {/* Auto-calculated fields */}
              <li>
                <label>BMI (auto-calculated)</label>
                <input type="text" value={formData.bmi} readOnly />
              </li>
              <li>
                <label>FSH/LH Ratio (auto-calculated)</label>
                <input type="text" value={formData.fsh_lh} readOnly />
              </li>
              <li>
                <label>Waist-Hip Ratio (auto-calculated)</label>
                <input type="text" value={formData.whr} readOnly />
              </li>
            </ul>
            <button type="submit" className="chat-submit">Predict</button>
          </form>

          {/* Results */}
          <div className="chat-results">
            {prediction && (
              <div className="chat-bubble result">
                <strong>Prediction:</strong> {prediction}
              </div>
            )}
            {probability && (
              <div className="chat-bubble result">
                <strong>Probability:</strong> {probability}
              </div>
            )}
            {error && <div className="chat-error">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyQuestion;
