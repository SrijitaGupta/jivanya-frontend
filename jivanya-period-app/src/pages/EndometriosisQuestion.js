import React, { useState } from 'react';
import "../styles/endo.css";
import endometriosisImg from '../assets/endometeiosis_bg.jpg';

function EndometriosisQuestions() {
  const [formData, setFormData] = useState({
    age: '',
    menstrualIrregularity: '',
    chronicPainLevel: '',
    hormoneLevelAbnormality: '',
    infertility: '',
    bmi: '',
  });

  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // start loading

    const convertYesNo = (val) => (val === 'Yes' ? 1 : 0);
    const painLevelMap = {
      Mild: 3.0,
      Moderate: 5.0,
      Severe: 7.0,
    };

    const payload = {
      features: [
        Number(formData.age),
        convertYesNo(formData.menstrualIrregularity),
        painLevelMap[formData.chronicPainLevel] || 0,
        convertYesNo(formData.hormoneLevelAbnormality),
        convertYesNo(formData.infertility),
        parseFloat(formData.bmi),
      ],
    };

    try {
      const response = await fetch('https://endometriosis.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      setResult({
        prediction: "Error",
        feedback: "Failed to fetch result.",
        warning: "",
      });
      setSubmitted(true);
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  const handleBack = () => {
    setSubmitted(false);
    setResult(null);
  };

  return (
    <div className="menses-container">
      <div className="menses-left">
        <img className="menses-image" src={endometriosisImg} alt="Endometriosis" />
      </div>

      <div className="menses-right">
        {!submitted && (
          <div className="form-container">
            <div className="chat-title">Endometriosis Prediction</div>
            <form className="chat-form" onSubmit={handleSubmit}>
              <ul>
                <li>
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    name="age"
                    placeholder="e.g. 30"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </li>
                <li>
                  <label htmlFor="menstrualIrregularity">Menstrual Irregularity</label>
                  <select
                    name="menstrualIrregularity"
                    value={formData.menstrualIrregularity}
                    onChange={handleChange}
                    required
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </li>
                <li>
                  <label htmlFor="chronicPainLevel">Chronic Pain Level</label>
                  <select
                    name="chronicPainLevel"
                    value={formData.chronicPainLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="Mild">Mild (3.0)</option>
                    <option value="Moderate">Moderate (5.0)</option>
                    <option value="Severe">Severe (7.0)</option>
                  </select>
                </li>
                <li>
                  <label htmlFor="hormoneLevelAbnormality">Hormone Level Abnormality</label>
                  <select
                    name="hormoneLevelAbnormality"
                    value={formData.hormoneLevelAbnormality}
                    onChange={handleChange}
                    required
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </li>
                <li>
                  <label htmlFor="infertility">Infertility</label>
                  <select
                    name="infertility"
                    value={formData.infertility}
                    onChange={handleChange}
                    required
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </li>
                <li>
                  <label htmlFor="bmi">BMI</label>
                  <input
                    type="number"
                    name="bmi"
                    placeholder="e.g. 28.7"
                    step="0.1"
                    value={formData.bmi}
                    onChange={handleChange}
                    required
                  />
                </li>
              </ul>
              <button type="submit" className="chat-submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        )}

        {submitted && result && (
          <div className="result-container" style={{ padding: '20px' }}>
            <h2>Endometriosis Prediction Result</h2>
            <p><strong>Prediction:</strong> {result.prediction}</p>
            <p><strong>Feedback:</strong> {result.feedback}</p>
            {result.warning && <p><strong>Warning:</strong> {result.warning}</p>}
            <button onClick={handleBack} style={{ marginTop: '20px' }}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EndometriosisQuestions;
