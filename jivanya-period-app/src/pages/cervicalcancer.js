import React, { useState } from "react";
import "../styles/chatbubble.css";
import cervicalImg from "../assets/cervical_bg.jpg";

const initialState = {
  Schiller: "no",
  Hinselmann: "no",
  pregnancies: "",
  age: "",
  sexual_partners: "",
  first_intercourse: "",
  dx_cin: "no",
  hormonal_contraceptives_years: "",
  citology: "no",
  dx: "no",
  iud: "no",
  dx_cancer: "no",
  smokes: "no",
  hormonal_contraceptives: "no",
  stds_syphilis: "no",
  stds_condylomatosis: "no",
  iud_years: "",
  stds_num_diagnosis: "",
  smokes_years: "",
  stds_vulvo: "no",
  stds_number: "",
};

export default function CervicalCancer() {
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

    const features = [
      formData.Schiller.toLowerCase(),
      formData.Hinselmann.toLowerCase(),
      Number(formData.pregnancies),
      Number(formData.age),
      Number(formData.sexual_partners),
      Number(formData.first_intercourse),
      formData.dx_cin,
      Number(formData.hormonal_contraceptives_years),
      formData.citology,
      formData.dx,
      formData.iud,
      formData.dx_cancer,
      formData.smokes,
      formData.hormonal_contraceptives,
      formData.stds_syphilis,
      formData.stds_condylomatosis,
      Number(formData.iud_years),
      Number(formData.stds_num_diagnosis),
      Number(formData.smokes_years),
      formData.stds_vulvo,
      Number(formData.stds_number),
    ];

    try {
      const response = await fetch("https://cervical-cancer-xl7g.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      setPrediction(data.prediction);
      setFeedback(data.feedback);
      setWarning(data.warning);
    } catch (err) {
      setError(`Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="endometriosis-container">
      <div className="endometriosis-left">
        <img src={cervicalImg} alt="Cervical Cancer Visual" className="endometriosis-image" />
      </div>

      <div className="endometriosis-right">
        <div className="form-container">
          <h1 className="chat-title">Cervical Cancer Risk Assessment</h1>

          {prediction === null ? (
            <form className="chat-form" onSubmit={handleSubmit}>
              <ul>
                <li>
                  <label>Has the Schiller test been performed and returned positive?</label>
                  <select name="Schiller" value={formData.Schiller} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>Was the Hinselmann test positive?</label>
                  <select name="Hinselmann" value={formData.Hinselmann} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>How many times have you been pregnant?</label>
                  <input
                    type="number"
                    min="0"
                    name="pregnancies"
                    placeholder="e.g., 2"
                    value={formData.pregnancies}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>What is your current age?</label>
                  <input
                    type="number"
                    min="0"
                    name="age"
                    placeholder="e.g., 30"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>How many sexual partners have you had?</label>
                  <input
                    type="number"
                    min="0"
                    name="sexual_partners"
                    placeholder="e.g., 3"
                    value={formData.sexual_partners}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>At what age did you first have sexual intercourse?</label>
                  <input
                    type="number"
                    min="0"
                    name="first_intercourse"
                    placeholder="e.g., 18"
                    value={formData.first_intercourse}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>Have you ever been diagnosed with CIN?</label>
                  <select name="dx_cin" value={formData.dx_cin} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>For how many years have you used hormonal contraceptives?</label>
                  <input
                    type="number"
                    min="0"
                    name="hormonal_contraceptives_years"
                    placeholder="e.g., 4"
                    value={formData.hormonal_contraceptives_years}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>Has your cytology test ever been positive?</label>
                  <select name="citology" value={formData.citology} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>Have you been diagnosed with any disease recently?</label>
                  <select name="dx" value={formData.dx} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>Are you currently using an IUD?</label>
                  <select name="iud" value={formData.iud} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>Have you been diagnosed with cancer?</label>
                  <select name="dx_cancer" value={formData.dx_cancer} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>Do you currently smoke?</label>
                  <select name="smokes" value={formData.smokes} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>Do you use hormonal contraceptives?</label>
                  <select name="hormonal_contraceptives" value={formData.hormonal_contraceptives} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>Have you ever had syphilis?</label>
                  <select name="stds_syphilis" value={formData.stds_syphilis} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>Have you ever been diagnosed with condylomatosis?</label>
                  <select name="stds_condylomatosis" value={formData.stds_condylomatosis} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>How many years have you used an IUD?</label>
                  <input
                    type="number"
                    min="0"
                    name="iud_years"
                    placeholder="e.g., 2"
                    value={formData.iud_years}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>How many times have you been diagnosed with an STD?</label>
                  <input
                    type="number"
                    min="0"
                    name="stds_num_diagnosis"
                    placeholder="e.g., 1"
                    value={formData.stds_num_diagnosis}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>For how many years have you been smoking?</label>
                  <input
                    type="number"
                    min="0"
                    name="smokes_years"
                    placeholder="e.g., 3"
                    value={formData.smokes_years}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>Have you had vulvo-perineal condylomatosis?</label>
                  <select name="stds_vulvo" value={formData.stds_vulvo} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </li>
                <li>
                  <label>How many different STDs have you had?</label>
                  <input
                    type="number"
                    min="0"
                    name="stds_number"
                    placeholder="e.g., 2"
                    value={formData.stds_number}
                    onChange={handleChange}
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
              <div className="chat-bubble result">Prediction: {prediction}</div>
              {feedback && (
                <div className="chat-bubble result" dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, "<br/>") }} />
              )}
              {warning && (
                <div className="chat-bubble result" dangerouslySetInnerHTML={{ __html: warning.replace(/\n/g, "<br/>") }} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
