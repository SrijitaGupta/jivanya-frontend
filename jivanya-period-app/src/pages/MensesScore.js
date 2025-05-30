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

  const validateInputs = () => {
    // Check all fields are filled (except unusual_bleeding which has default)
    for (const key in formData) {
      if (formData[key] === "" || formData[key] === null) {
        return "Please fill all the fields.";
      }
    }

    // Validate number_of_peak (e.g. between 1 and 10)
    const numPeak = Number(formData.number_of_peak);
    if (isNaN(numPeak) || numPeak < 1 || numPeak > 10) {
      return "Number of Peak Days must be between 1 and 10.";
    }

    // Validate Age (e.g. 10 to 60)
    const age = Number(formData.Age);
    if (isNaN(age) || age < 10 || age > 60) {
      return "Age must be between 10 and 60.";
    }

    // Validate Length_of_cycle (e.g. 20 to 45)
    const cycleLength = Number(formData.Length_of_cycle);
    if (isNaN(cycleLength) || cycleLength < 20 || cycleLength > 45) {
      return "Length of Cycle must be between 20 and 45 days.";
    }

    // Validate Estimated_day_of_ovulation (e.g. 5 to 25)
    const ovulationDay = Number(formData.Estimated_day_of_ovulation);
    if (isNaN(ovulationDay) || ovulationDay < 5 || ovulationDay > 25) {
      return "Estimated Day of Ovulation must be between 5 and 25.";
    }

    // Validate Length_of_Leutal_Phase (e.g. 8 to 20)
    const lutealPhase = Number(formData.Length_of_Leutal_Phase);
    if (isNaN(lutealPhase) || lutealPhase < 8 || lutealPhase > 20) {
      return "Length of Luteal Phase must be between 8 and 20 days.";
    }

    // Validate Length_of_menses (e.g. 2 to 10)
    const mensesLength = Number(formData.Length_of_menses);
    if (isNaN(mensesLength) || mensesLength < 2 || mensesLength > 10) {
      return "Length of Menses must be between 2 and 10 days.";
    }

    // Validate BMI (e.g. 10 to 60)
    const bmi = Number(formData.BMI);
    if (isNaN(bmi) || bmi < 10 || bmi > 60) {
      return "BMI must be between 10 and 60.";
    }

    // Validate Mean_of_length_of_cycle (e.g. 20 to 45)
    const meanCycle = Number(formData.Mean_of_length_of_cycle);
    if (isNaN(meanCycle) || meanCycle < 20 || meanCycle > 45) {
      return "Mean Length of Cycle must be between 20 and 45 days.";
    }

    return null; // no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

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
                    type="number"
                    name="number_of_peak"
                    value={formData.number_of_peak}
                    onChange={handleChange}
                    placeholder="e.g., 3"
                    min="1"
                    max="10"
                    required
                  />
                </li>
                <li>
                  <label>Age:</label>
                  <input
                    type="number"
                    name="Age"
                    value={formData.Age}
                    onChange={handleChange}
                    placeholder="e.g., 28"
                    min="10"
                    max="60"
                    required
                  />
                </li>
                <li>
                  <label>Length of Cycle:</label>
                  <input
                    type="number"
                    name="Length_of_cycle"
                    value={formData.Length_of_cycle}
                    onChange={handleChange}
                    placeholder="e.g., 30"
                    min="20"
                    max="45"
                    required
                  />
                </li>
                <li>
                  <label>Estimated Day of Ovulation:</label>
                  <input
                    type="number"
                    name="Estimated_day_of_ovulation"
                    value={formData.Estimated_day_of_ovulation}
                    onChange={handleChange}
                    placeholder="e.g., 16"
                    min="5"
                    max="25"
                    required
                  />
                </li>
                <li>
                  <label>Length of Luteal Phase:</label>
                  <input
                    type="number"
                    name="Length_of_Leutal_Phase"
                    value={formData.Length_of_Leutal_Phase}
                    onChange={handleChange}
                    placeholder="e.g., 16"
                    min="8"
                    max="20"
                    required
                  />
                </li>
                <li>
                  <label>Length of Menses:</label>
                  <input
                    type="number"
                    name="Length_of_menses"
                    value={formData.Length_of_menses}
                    onChange={handleChange}
                    placeholder="e.g., 4"
                    min="2"
                    max="10"
                    required
                  />
                </li>
                <li>
                  <label>Unusual Bleeding:</label>
                  <select
                    name="unusual_bleeding"
                    value={formData.unusual_bleeding}
                    onChange={handleChange}
                    required
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>BMI:</label>
                  <input
                    type="number"
                    name="BMI"
                    value={formData.BMI}
                    onChange={handleChange}
                    placeholder="e.g., 22.3"
                    min="10"
                    max="60"
                    step="0.1"
                    required
                  />
                </li>
                <li>
                  <label>Mean Length of Cycle:</label>
                  <input
                    type="number"
                    name="Mean_of_length_of_cycle"
                    value={formData.Mean_of_length_of_cycle}
                    onChange={handleChange}
                    placeholder="e.g., 30"
                    min="20"
                    max="45"
                    required
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
                  className="chat-bubble warning"
                  dangerouslySetInnerHTML={{
                    __html: warningMessage.replace(/\n/g, "<br/>"),
                  }}
                />
              )}
              <button
                className="chat-submit"
                onClick={() => {
                  setScore(null);
                  setFullExplanation(null);
                  setPersonalizedMessage(null);
                  setWarningMessage(null);
                  setFormData(initialState);
                  setError(null);
                }}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
