import React, { useState } from "react";
import "../styles/pregnancychances.css";
import pcosImage from "../assets/pcos.jpg";

const initialState = {
  age: "",
  weight: "",
  height: "",
  bmi: "",
  cycle: "",
  cycleLength: "",
  fsh: "",
  lh: "",
  fsh_lh: "",
  tsh: "",
  amh: "",
  prl: "",
  prg: "",
  hb: "",
  endometrium: "",
  abortions: "",
};

export default function PCOSQuestions() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);
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
      Number(formData.age),
      Number(formData.weight),
      Number(formData.height),
      Number(formData.bmi),
      formData.cycle === "Irregular" ? 1 : 0,
      Number(formData.cycleLength),
      Number(formData.fsh),
      Number(formData.lh),
      Number(formData.fsh_lh),
      Number(formData.tsh),
      Number(formData.amh),
      Number(formData.prl),
      Number(formData.prg),
      Number(formData.hb),
      Number(formData.endometrium),
      Number(formData.abortions),
    ];

    try {
      const res = await fetch("https://pcoswithtest.onrender.com/predict", {
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
      setProbability(data.probability || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="menses-container">
      <div className="menses-left">
        <img src={pcosImage} alt="PCOS" className="menses-image" />
      </div>

      <div className="menses-right">
        <div className="form-container">
          <h1 className="chat-title">PCOS Risk Checker with Test</h1>

          {prediction === null ? (
            <form className="chat-form" onSubmit={handleSubmit}>
              <ul>
                <li>
                  <label>Age:</label>
                  <input name="age" value={formData.age} onChange={handleChange} placeholder="25" required />
                </li>
                <li>
                  <label>Weight (kg):</label>
                  <input name="weight" value={formData.weight} onChange={handleChange} placeholder="75" required />
                </li>
                <li>
                  <label>Height (cm):</label>
                  <input name="height" value={formData.height} onChange={handleChange} placeholder="160" required />
                </li>
                <li>
                  <label>BMI:</label>
                  <input name="bmi" value={formData.bmi} onChange={handleChange} placeholder="20.3" required />
                </li>
                <li>
                  <label>Cycle Type:</label>
                  <select name="cycle" value={formData.cycle} onChange={handleChange} required>
                    
                    <option value="Regular">Regular</option>
                    <option value="Irregular">Irregular</option>
                  </select>
                </li>
                <li>
                  <label>Cycle Length (days):</label>
                  <input name="cycleLength" value={formData.cycleLength} onChange={handleChange} placeholder="35" required />
                </li>
                <li>
                  <label>FSH (mIU/mL):</label>
                  <input name="fsh" value={formData.fsh} onChange={handleChange} placeholder="4.5" required />
                </li>
                <li>
                  <label>LH (mIU/mL):</label>
                  <input name="lh" value={formData.lh} onChange={handleChange} placeholder="12.0" required />
                </li>
                <li>
                  <label>FSH/LH Ratio:</label>
                  <input name="fsh_lh" value={formData.fsh_lh} onChange={handleChange} placeholder="0.38" required />
                </li>
                <li>
                  <label>TSH (mIU/L):</label>
                  <input name="tsh" value={formData.tsh} onChange={handleChange} placeholder="3.5" required />
                </li>
                <li>
                  <label>AMH (ng/mL):</label>
                  <input name="amh" value={formData.amh} onChange={handleChange} placeholder="7.5" required />
                </li>
                <li>
                  <label>PRL (ng/mL):</label>
                  <input name="prl" value={formData.prl} onChange={handleChange} placeholder="25.0" required />
                </li>
                <li>
                  <label>PRG (ng/mL):</label>
                  <input name="prg" value={formData.prg} onChange={handleChange} placeholder="1.2" required />
                </li>
                <li>
                  <label>Hemoglobin (g/dL):</label>
                  <input name="hb" value={formData.hb} onChange={handleChange} placeholder="11.5" required />
                </li>
                <li>
                  <label>Endometrium Thickness (mm):</label>
                  <input name="endometrium" value={formData.endometrium} onChange={handleChange} placeholder="10.0" required />
                </li>
                <li>
                  <label>No. of Abortions:</label>
                  <input name="abortions" value={formData.abortions} onChange={handleChange} placeholder="0" required />
                </li>
              </ul>

              <button className="chat-submit" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Check Risk"}
              </button>

              {error && <div className="chat-error">{error}</div>}
            </form>
          ) : (
            <div className="chat-results">
              <div className="chat-bubble result" dangerouslySetInnerHTML={{ __html: prediction.replace(/\n/g, "<br/>") }} />
              {probability !== null && (
                <div className="chat-bubble result">Probability: {probability}</div>
              )}
              <button className="chat-submit" onClick={goBack} style={{ marginTop: "15px" }}>
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
