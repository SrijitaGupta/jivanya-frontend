import React, { useState } from "react";
import "../styles/pregnancychances.css";
import pcosImage from "../assets/pcos.jpg";

const initialState = {
  age: "",
  weight: "",
  height: "",
  bloodGroup: "",
  cycleGap: "",
  recentWeightGain: "No",
  facialHair: "No",
  skinDarkening: "No",
  hairLoss: "No",
  acne: "No",
  fastFood: "No",
  exercise: "No",
  moodSwings: "No",
  periodRegularity: "Regular",
  periodDuration: "",
};

export default function PCOSQuestions() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [warning, setWarning] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const updatedFormData = {
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      bloodGroup: formData.bloodGroup,
      cycleGap: Number(formData.cycleGap),
      recentWeightGain: formData.recentWeightGain === "Yes" ? 1 : 0,
      facialHair: formData.facialHair === "Yes" ? 1 : 0,
      skinDarkening: formData.skinDarkening === "Yes" ? 1 : 0,
      hairLoss: formData.hairLoss === "Yes" ? 1 : 0,
      acne: formData.acne === "Yes" ? 1 : 0,
      fastFood: formData.fastFood === "Yes" ? 1 : 0,
      exercise: formData.exercise === "Yes" ? 1 : 0,
      moodSwings: formData.moodSwings === "Yes" ? 1 : 0,
      periodRegularity: formData.periodRegularity === "Regular" ? 1 : 0,
      periodDuration: Number(formData.periodDuration),
    };

    const features = Object.values(updatedFormData);

    try {
      const res = await fetch("https://withouttestpcos.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`HTTP ${res.status}: ${err}`);
      }

      const data = await res.json();
      setPrediction(data.prediction);
      setFeedback(data.feedback || null);
      setWarning(data.warning || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goToAdvancedTest = () => {
    window.location.href = "/advanced-test";
  };

  return (
    <div className="menses-container">
      <div className="menses-left">
        <img src={pcosImage} alt="PCOS" className="menses-image" />
      </div>

      <div className="menses-right">
        <div className="form-container">
          <h1 className="chat-title">PCOS Risk Checker</h1>

          {prediction === null ? (
            <form className="chat-form" onSubmit={handleSubmit}>
              <ul>
                <li>
                  <label>Age:</label>
                  <input name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 25" required />
                </li>
                <li>
                  <label>Weight (kg):</label>
                  <input name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g. 55" required />
                </li>
                <li>
                  <label>Height (cm):</label>
                  <input name="height" value={formData.height} onChange={handleChange} placeholder="e.g. 165" required />
                </li>
                <li>
                  <label>Blood Group:</label>
                  <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="e.g. B+" required />
                </li>
                <li>
                  <label>Months between periods (1 if regular):</label>
                  <input name="cycleGap" value={formData.cycleGap} onChange={handleChange} placeholder="e.g. 1" required />
                </li>
                <li>
                  <label>Recent Weight Gain:</label>
                  <select name="recentWeightGain" value={formData.recentWeightGain} onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </li>
                <li>
                  <label>Facial/Body Hair:</label>
                  <select name="facialHair" value={formData.facialHair} onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </li>
                <li>
                  <label>Skin Darkening:</label>
                  <select name="skinDarkening" value={formData.skinDarkening} onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </li>
                <li>
                  <label>Hair Loss/Thinning:</label>
                  <select name="hairLoss" value={formData.hairLoss} onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </li>
                <li>
                  <label>Acne:</label>
                  <select name="acne" value={formData.acne} onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </li>
                <li>
                  <label>Fast Food Consumption:</label>
                  <select name="fastFood" value={formData.fastFood} onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </li>
                <li>
                  <label>Exercise:</label>
                  <select name="exercise" value={formData.exercise} onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </li>
                <li>
                  <label>Mood Swings:</label>
                  <select name="moodSwings" value={formData.moodSwings} onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </li>
                <li>
                  <label>Period Regularity:</label>
                  <select name="periodRegularity" value={formData.periodRegularity} onChange={handleChange}>
                    <option value="Regular">Regular</option>
                    <option value="Irregular">Irregular</option>
                  </select>
                </li>
                <li>
                  <label>Period Duration (days):</label>
                  <input name="periodDuration" value={formData.periodDuration} onChange={handleChange} placeholder="e.g. 6" required />
                </li>
              </ul>

              <button className="chat-submit" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Check Risk"}
              </button>

              {error && <div className="chat-error">{error}</div>}
            </form>
          ) : (
            <div className="chat-results">
              <div className="chat-bubble result">Prediction: {prediction}</div>
              {feedback && (
                <div className="chat-bubble result" dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, "<br/>") }} />
              )}
              {warning && (
                <div className="chat-bubble result" dangerouslySetInnerHTML={{ __html: warning.replace(/\n/g, "<br/>") }} />
              )}
              <button className="chat-submit" onClick={goToAdvancedTest} style={{ marginTop: "15px" }}>
                Go to Advanced Test
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
