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
  const [loading, setLoading] = useState(false);

  const questions = [
    ["age", "What's your age? (years)"],
    ["weight", "Enter your weight (kg):"],
    ["height", "Enter your height (cm):"],
    ["bmi", "BMI (Body Mass Index):"],
    ["pulse", "What is your pulse rate (bpm)?"],
    ["rr", "Respiratory rate (breaths/min)?"],
    ["hb", "Hemoglobin level (g/dL)?"],
    ["cycle", "Cycle type (1 = Regular, 0 = Irregular)?"],
    ["cycleLength", "Cycle length (in days)?"],
    ["abortions", "Number of abortions?"],
    ["fsh", "FSH level (mIU/mL)?"],
    ["lh", "LH level (mIU/mL)?"],
    ["fsh_lh", "FSH/LH Ratio:"],
    ["tsh", "TSH level (mIU/L)?"],
    ["prl", "PRL (Prolactin) level (ng/mL)?"],
    ["prg", "PRG (Progesterone) level (ng/mL)?"],
    ["waist", "Waist size (inch)?"],
    ["hip", "Hip size (inch)?"],
    ["whr", "Waist-Hip Ratio:"],
    ["vitD3", "Vitamin D3 level (ng/mL)?"],
    ["rbs", "Random blood sugar (mg/dL)?"],
    ["endometrium", "Endometrium thickness (mm)?"]
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    for (const key in formData) {
      if (formData[key] === "" || formData[key] === null) return false;
    }
    if (!(formData.cycle === "0" || formData.cycle === "1")) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction("");
    setProbability("");
    setLoading(true);

    if (!validateInputs()) {
      setError("Please fill in all fields correctly. Cycle must be 0 or 1.");
      setLoading(false);
      return;
    }

    const featureOrder = [
      "age", "weight", "height", "bmi", "pulse", "rr", "hb", "cycle", "cycleLength",
      "abortions", "fsh", "lh", "fsh_lh", "tsh", "prl", "prg", "waist", "hip", "whr",
      "vitD3", "rbs", "endometrium"
    ];

    const featuresArray = featureOrder.map(key => Number(formData[key]));

    try {
      const res = await axios.post(
        "https://pregnancy-9fa7.onrender.com/predict",
        { features: featuresArray }
      );
      setPrediction(res.data.prediction || "No prediction received.");
      setProbability(
        res.data.probability !== undefined
          ? res.data.probability.toString()
          : ""
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Prediction failed. Please check your input and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="menses-container">
      <div className="menses-left">
        <img src={pregnancyImg} alt="Pregnancy" className="menses-image" />
      </div>
      <div className="menses-right">
        <div className="form-container">
          <div className="chat-title">Pregnancy Prediction</div>

          {/* Conditionally show form only if prediction is empty */}
          {!prediction && (
            <form onSubmit={handleSubmit} className="chat-form">
              <ul>
                {questions.map(([key, label]) => (
                  <li key={key}>
                    <label>{label}</label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder={`e.g. ${
                        {
                          age: "25",
                          weight: "60",
                          height: "160",
                          bmi: "23.4",
                          pulse: "78",
                          rr: "18",
                          hb: "12.3",
                          cycle: "1",
                          cycleLength: "28",
                          abortions: "0",
                          fsh: "5.2",
                          lh: "4.7",
                          fsh_lh: "1.1",
                          tsh: "2.8",
                          prl: "14.2",
                          prg: "1.1",
                          waist: "28",
                          hip: "36",
                          whr: "0.78",
                          vitD3: "32.5",
                          rbs: "90",
                          endometrium: "8.0",
                        }[key] || ""
                      }`}
                      maxLength={key === "cycle" ? 1 : undefined}
                    />
                  </li>
                ))}
              </ul>
              <button type="submit" className="chat-submit" disabled={loading}>
                {loading ? <div className="spinner"></div> : "Predict"}
              </button>
            </form>
          )}

          <div className="chat-results">
            {prediction && (
              <div className="chat-bubble result">
                <strong>Prediction:</strong> <br />
                <span style={{ whiteSpace: "pre-wrap" }}>{prediction}</span>
              </div>
            )}
            {probability !== "" && (
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
