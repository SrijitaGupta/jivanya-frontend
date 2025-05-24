import React, { useState } from "react";
import "../styles/chatbubble.css";
import mensesImg from "../assets/menses_scorebg.jpg";

const initialState = {
  number_of_peak: "",
  Age: "",
  Length_of_cycle: "",
  Estimated_day_of_ovulation: "",
  Length_of_Leutal_Phase: "",
  Length_of_menses: "",
  unusual_bleeding: "no",
  BMI: "",
  Mean_of_length_of_cycle: "",
};

export default function MensesScore() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [fullExplanation, setFullExplanation] = useState(null);
  const [personalizedMessage, setPersonalizedMessage] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formattedData = {
      number_of_peak: Number(formData.number_of_peak),
      Age: Number(formData.Age),
      Length_of_cycle: Number(formData.Length_of_cycle),
      Estimated_day_of_ovulation: Number(formData.Estimated_day_of_ovulation),
      Length_of_Leutal_Phase: Number(formData.Length_of_Leutal_Phase),
      Length_of_menses: Number(formData.Length_of_menses),
      unusual_bleeding: formData.unusual_bleeding.toLowerCase(),
      BMI: Number(formData.BMI),
      Mean_of_length_of_cycle: Number(formData.Mean_of_length_of_cycle),
    };

    try {
      const response = await fetch("https://menses-score-api-1.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: formattedData }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      setScore(data.score);
      setFullExplanation(data.full_explanation);
      setPersonalizedMessage(data.personalized_message);
      setWarningMessage(data.warning_message);
    } catch (err) {
      setError(`Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="endometriosis-container">
      <div className="endometriosis-left">
        <img src={mensesImg} alt="Menses Visual" className="endometriosis-image" />
      </div>

      <div className="endometriosis-right">
        <div className="form-container">
          <h1 className="chat-title">Menses Score Questionnaire</h1>

          {score === null ? (
            <form className="chat-form" onSubmit={handleSubmit}>
              <ul>
                <li>
                  <label>Number of Peak Days:</label>
                  <input
                    name="number_of_peak"
                    value={formData.number_of_peak}
                    onChange={handleChange}
                    placeholder="e.g., 3"
                  />
                </li>
                <li>
                  <label>Age:</label>
                  <input name="Age" value={formData.Age} onChange={handleChange} placeholder="e.g., 28" />
                </li>
                <li>
                  <label>Length of Cycle:</label>
                  <input
                    name="Length_of_cycle"
                    value={formData.Length_of_cycle}
                    onChange={handleChange}
                    placeholder="e.g., 30"
                  />
                </li>
                <li>
                  <label>Estimated Day of Ovulation:</label>
                  <input
                    name="Estimated_day_of_ovulation"
                    value={formData.Estimated_day_of_ovulation}
                    onChange={handleChange}
                    placeholder="e.g., 16"
                  />
                </li>
                <li>
                  <label>Length of Luteal Phase:</label>
                  <input
                    name="Length_of_Leutal_Phase"
                    value={formData.Length_of_Leutal_Phase}
                    onChange={handleChange}
                    placeholder="e.g., 16"
                  />
                </li>
                <li>
                  <label>Length of Menses:</label>
                  <input
                    name="Length_of_menses"
                    value={formData.Length_of_menses}
                    onChange={handleChange}
                    placeholder="e.g., 4"
                  />
                </li>
                <li>
                  <label>Unusual Bleeding:</label>
                  <select
                    name="unusual_bleeding"
                    value={formData.unusual_bleeding}
                    onChange={handleChange}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>BMI:</label>
                  <input
                    name="BMI"
                    value={formData.BMI}
                    onChange={handleChange}
                    placeholder="e.g., 22.3"
                  />
                </li>
                <li>
                  <label>Mean Length of Cycle:</label>
                  <input
                    name="Mean_of_length_of_cycle"
                    value={formData.Mean_of_length_of_cycle}
                    onChange={handleChange}
                    placeholder="e.g., 30"
                  />
                </li>
              </ul>

              <button className="chat-submit" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
              {error && <div className="chat-error">{error}</div>}
            </form>
          ) : (
            <div className="chat-results">
              <div className="chat-bubble result">Score: {score}</div>
              {fullExplanation && (
                <div
                  className="chat-bubble result"
                  dangerouslySetInnerHTML={{
                    __html: fullExplanation.replace(/\n/g, "<br/>"),
                  }}
                />
              )}
              {personalizedMessage && (
                <div
                  className="chat-bubble result"
                  dangerouslySetInnerHTML={{
                    __html: personalizedMessage.replace(/\n/g, "<br/>"),
                  }}
                />
              )}
              {warningMessage && (
                <div
                  className="chat-bubble result"
                  dangerouslySetInnerHTML={{
                    __html: warningMessage.replace(/\n/g, "<br/>"),
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
