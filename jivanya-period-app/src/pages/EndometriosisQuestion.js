import React, { useState } from 'react';
import "../styles/endo.css";
import endometriosisImg from '../assets/endometeiosis_bg.jpg'; // Image for endometriosis

function EndometriosisQuestions() {
  const [formData, setFormData] = useState({
    age: '',
    menstrualIrregularity: '',
    chronicPainLevel: '',
    hormoneLevelAbnormality: '',
    infertility: '',
    bmi: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
  };

  return (
    <div className="menses-container">
      {/* Left side: Image */}
      <div className="menses-left">
        <img className="menses-image" src={endometriosisImg} alt="Endometriosis" />
      </div>

      {/* Right side: Form */}
      <div className="menses-right">
        <div className="form-container">
          <div className="chat-title">Endometriosis Prediction</div>
          <form className="chat-form" onSubmit={handleSubmit}>
            <ul>
              <li>
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </li>
              <li>
                <label htmlFor="menstrualIrregularity">Menstrual Irregularity</label>
                <select
                  name="menstrualIrregularity"
                  value={formData.menstrualIrregularity}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
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
                >
                  <option value="">Select</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </li>
              <li>
                <label htmlFor="hormoneLevelAbnormality">Hormone Level Abnormality</label>
                <select
                  name="hormoneLevelAbnormality"
                  value={formData.hormoneLevelAbnormality}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
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
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </li>
              <li>
                <label htmlFor="bmi">BMI</label>
                <input
                  type="number"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleChange}
                />
              </li>
            </ul>
            <button type="submit" className="chat-submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EndometriosisQuestions;
