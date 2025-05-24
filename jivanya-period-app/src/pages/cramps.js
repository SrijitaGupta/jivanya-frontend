import React from "react";
import "../styles/Cramps.css"; // Custom styling for the design
import OverviewImg from "../assets/cramps-overview-img.jpg";
import TreatmentImg from "../assets/cramps-treatment-img.jpg";
import CausesImg from "../assets/cramps-causes-risks-img.jpg";
import SymptomImg1 from "../assets/cramps-symptom1-img.jpg";
import SymptomImg2 from "../assets/cramps-symptom2-img.jpg";

const Cramps = () => {
  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="cramps-page">
      <div className="cramps-header">
        <h1>Menstrual cramps</h1>
        <div className="cramps-buttons">
          <button onClick={() => scrollTo("symptoms")}>Symptoms</button>
          <button onClick={() => scrollTo("risk")}>Causes & Risk Factors</button>
          <button onClick={() => scrollTo("treatment")}>Treatment</button>
        </div>
      </div>

      {/* Overview section */}
      <div className="cramps-section overview" id="overview">
        <div className="overview-image">
          <img src={OverviewImg} alt="Menstrual cramps" />
        </div>
        <div className="overview-text">
          <h2>Overview</h2>
          <p>
            Menstrual cramps (dysmenorrhea) are throbbing or cramping pains in the lower abdomen.
            Many women have menstrual cramps just before and during their menstrual periods.
            <br />
            For some women, the discomfort is merely annoying. For others,
            menstrual cramps can be severe enough to interfere with everyday
            activities for a few days every month.
            <br />
            Conditions such as endometriosis or uterine fibroids can cause
            menstrual cramps. Treating the cause is key to reducing the pain.
            <br />
            Menstrual cramps that aren't caused by another condition tend to
            lessen with age and often improve after giving birth.
          </p>
        </div>
      </div>

      {/* Symptoms section */}
      <div className="cramps-section" id="symptoms">
        <h2>Symptoms</h2>
        <div className="symptoms-top-row">
          <div className="symptoms-text">
            <ul>
              <li>Aching <b>pain</b> in your belly (sometimes severe)</li>
              <li>A feeling of pressure in your belly</li>
              <li><b>Pain in your hips</b>, lower back, and inner thighs</li>
            </ul>
            <p>When cramps are severe, symptoms may include:</p>
            <ul>
              <li><b>Upset stomach</b></li>
              <li>Vomiting</li>
              <li>Loose stools</li>
              <li>Headache</li>
              <li>Dizziness</li>
            </ul>
          </div>
          <img src={SymptomImg1} alt="Lower abdominal pain" className="symptoms-image-right" />
        </div>
        <img src={SymptomImg2} alt="Headache and nausea" className="symptoms-image-bottom" />
      </div>

      {/* Causes & Risk Factors section */}
      <div className="cramps-section" id="risk">
        <h2>Causes & Risk Factors</h2>
        <div className="causes-content">
          <div className="causes-text">
            <p>
              Menstrual cramps happen because of contractions in the uterus, or womb, which is a muscle.
              If it contracts too strongly during your menstrual cycle, it can press against nearby blood vessels.
              This briefly cuts off oxygen to the uterus. It’s this lack of oxygen that causes your pain and cramping.
            </p>
            <p>You can also have cramps because of:</p>
            <ul>
              <li>Endometriosis</li>
              <li>Fibroids in your uterus</li>
              <li>Adenomyosis</li>
              <li>Pelvic inflammatory disease (PID)</li>
              <li>Cervical stenosis</li>
            </ul>
            <p>Certain things put you at a higher risk of menstrual cramps. You’re more likely to have them if you:</p>
            <ul>
              <li>Are under 30</li>
              <li>Started puberty early (≤11)</li>
              <li>Bleed heavily during periods</li>
              <li>Have irregular bleeding</li>
              <li>Have a family history of cramps</li>
              <li>Smoke</li>
            </ul>
          </div>
          <div className="Causes-image">
            <img src={CausesImg} alt="Causes and risks" />
          </div>
        </div>
      </div>

      {/* Treatment section */}
      <div className="cramps-section" id="treatment">
        <h2>Treatment</h2>
        <div className="treatment-content">
          <div className="treatment-text">
            <p>
              Place a heating pad or hot water bottle on your lower back or tummy.
              A warm bath may also provide some relief.
            </p>
            <p>Other lifestyle changes that may help:</p>
            <ul>
              <li>Rest when you need it</li>
              <li>Avoid caffeine and salt</li>
              <li>Avoid tobacco and alcohol</li>
              <li>Massage your lower back and abdomen</li>
              <li>Take dietary supplements</li>
              <li>Manage your stress</li>
              <li>Try acupuncture or acupressure</li>
              <li>Ask your doctor about herbal medicines</li>
              <li>Exercise regularly</li>
            </ul>
          </div>
          <div className="Treatment-image">
            <img src={TreatmentImg} alt="Treatment of cramps" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cramps;
