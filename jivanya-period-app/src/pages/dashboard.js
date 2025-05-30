import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/dashboard.css";
import periodIcon from "../assets/period_tracker.jpg";
import axios from "axios";
import jsPDF from "jspdf";

const defaultImages = [
  "https://images.pexels.com/photos/53141/rose-red-blossom-bloom-53141.jpeg",
  "https://images.pexels.com/photos/34950/pexels-photo.jpg",
  "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg"
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(() => localStorage.getItem("profileImage") || "");
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [ovulationDays, setOvulationDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [daysLeft, setDaysLeft] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const dialogRef = useRef(null);

  const symptomCauses = {
    cramps: 'Caused by uterine contractions and the release of prostaglandins.',
    fatigue: 'Hormonal shifts, iron deficiency, and poor sleep during period.',
    bloating: 'Hormonal changes leading to water retention.',
    moodSwings: 'Fluctuations in estrogen and progesterone levels.',
    headache: 'Estrogen drops before your period can trigger headaches.',
    acne: 'Hormonal imbalances, especially increased androgens before periods.',
  };

  useEffect(() => {
    const savedLastPeriod = localStorage.getItem('lastPeriod');
    const savedCycle = localStorage.getItem('cycleLength');
    const savedPeriod = localStorage.getItem('periodLength');

    if (savedLastPeriod) setLastPeriod(savedLastPeriod);
    if (savedCycle) setCycleLength(Number(savedCycle));
    if (savedPeriod) setPeriodLength(Number(savedPeriod));
  }, []);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => value > 1 && setter(value - 1);

  useEffect(() => {
    if (lastPeriod) {
      axios.post("https://cycle-calc.onrender.com/api/cycle", {
        lastPeriod,
        cycleLength,
        periodLength
      })
      .then((response) => {
        const { highlightedDays, ovulationDays, daysLeft } = response.data;
        setHighlightedDays(highlightedDays);
        setOvulationDays(ovulationDays);
        setDaysLeft(daysLeft);
      })
      .catch((error) => {
        console.error("Error fetching cycle data:", error);
      });
    }
  }, [lastPeriod, cycleLength, periodLength, currentMonth, currentYear]);


  const getMonthDays = (year, month) => {
    const date = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    const firstDayOfWeek = date.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      localStorage.setItem("profileImage", imageData);
      setProfileImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleDefaultChange = () => {
    const nextIndex = (defaultIndex + 1) % defaultImages.length;
    setDefaultIndex(nextIndex);
    setProfileImage(defaultImages[nextIndex]);
    localStorage.setItem("profileImage", defaultImages[nextIndex]);
  };

  const days = getMonthDays(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Period Tracker Summary", 20, 20);

    doc.setFontSize(12);
    doc.text(`Last Period: ${lastPeriod}`, 20, 40);
    doc.text(`Cycle Length: ${cycleLength} days`, 20, 50);
    doc.text(`Period Length: ${periodLength} days`, 20, 60);
    doc.text(`Days Left Until Next Period: ${daysLeft !== null ? daysLeft : 'N/A'} day(s)`, 20, 70);

    doc.text("Period Days This Month:", 20, 90);
    doc.text(highlightedDays.join(", ") || "None", 20, 100);

    doc.text("Ovulation Days This Month:", 20, 120);
    doc.text(ovulationDays.join(", ") || "None", 20, 130);

    doc.save("period-tracker-summary.pdf");
  };


  return (
    <div className="dashboard-container">
      <aside className="sidebar-dashboard">
        <nav>
          <div className="profile-section">
            <div className="profile-hover-container">
              <img
                src={profileImage || defaultImages[defaultIndex]}
                alt="Profile"
                className="profile-pic"
                onClick={() => dialogRef.current?.showModal()}
              />
              <dialog ref={dialogRef} className="profile-dialog">
                <div className="dialog-content">
                  <h3>Change Profile Picture</h3>
                  <label className="upload-btn">
                    Upload
                    <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                  </label>
                  <button className="default-btn" onClick={handleDefaultChange}>Try Default</button>
                  <button onClick={() => dialogRef.current.close()}>Close</button>
                </div>
              </dialog>
            </div>
          </div>

          <button className="dashboardmenu-button" onClick={() => navigate('/insight')}>
            <i className="fas fa-chart-line"></i> Insights
          </button>
          <button className="dashboardmenu-button" onClick={() => navigate('/tracker')}>
            <i className="fas fa-heartbeat"></i> Health Tracker
          </button>
          <button className="dashboardmenu-button" onClick={() => navigate('/logout')}>
           Logout
          </button>

        </nav>
      </aside>

      <main className="main-content">
        <section className="herodashboard">
          <div className="header-with-image">
            <div className="header-text">
              <h1>Period Calculator: Predict your next cycle</h1>
              <p>
                Being able to predict when your next period might arrive can save you a lot of hassle and help you
                understand your menstrual cycle. Predict when your next period might start with Jivanya's easy-to-use
                period calculator.
              </p>
            </div>
            <img src={periodIcon} alt="Period Icon" className="header-right-image" />
          </div>
        </section>

        <section className="sectiondashboard">
          <div className="calendar-box">
            <h2>{monthName} {currentYear}</h2>
            <div className="calendar-nav month-header">
              <button onClick={handlePrevMonth}>&lt;</button>
              <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="calendar-grid">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="day-label">{day}</div>
              ))}
              {days.map((day, index) => {
                const isPeriod = highlightedDays.includes(day);
                const isOvulation = ovulationDays.includes(day);
                const classes = [
                  'calendar-day',
                  isPeriod ? 'highlight' : '',
                  isOvulation ? 'ovulation' : ''
                ].join(' ').trim();

                return (
                  <div key={index} className={classes}>
                    {day || ""}
                  </div>
                );
              })}
            </div>

            <div className="legend">
              <div><span className="legend-box period"></span> Period Days</div>
              <div><span className="legend-box ovulation"></span> Ovulation Days</div>
            </div>
          </div>

          <div className="inputs-box">
            <h2>Cycle Details</h2>

            <div>
              <label htmlFor="lastPeriod">Last Day of Period</label>
              <input
                type="date"
                id="lastPeriod"
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
              />
            </div>

            <div>
              <label>Cycle Length (days)</label>
              <div className="number-control-box">
                <button onClick={() => decrement(setCycleLength, cycleLength)}>-</button>
                <div className="number-display">{cycleLength}</div>
                <button onClick={() => increment(setCycleLength, cycleLength)}>+</button>
              </div>
            </div>

            <div>
              <label>Number of Days Period Lasts</label>
              <div className="number-control-box">
                <button onClick={() => decrement(setPeriodLength, periodLength)}>-</button>
                <div className="number-display">{periodLength}</div>
                <button onClick={() => increment(setPeriodLength, periodLength)}>+</button>
              </div>
            </div>

            <button
              className="set-cycle-btn"
              onClick={() => {
                localStorage.setItem('lastPeriod', lastPeriod);
                localStorage.setItem('cycleLength', cycleLength);
                localStorage.setItem('periodLength', periodLength);
                alert("Cycle saved!");
              }}
            >
              Set Cycle
            </button>

            {daysLeft !== null && (
              <div className="days-left-box">
                <h3>Next Period In:</h3>
                <p>{daysLeft} {daysLeft === 1 ? "day" : "days"}</p>
              </div>
            )}

            <button className="set-cycle-btn" onClick={exportToPDF}>
              Download Summary as PDF
</button>

          </div>
        </section>

        <section className="sectiondashboard">
          <div className="symptom-logger-box">
            <h2>Log Period Symptoms</h2>
            <label htmlFor="symptom-select">Select your symptom</label>
            <select
              id="symptom-select"
              value={selectedSymptom}
              onChange={(e) => setSelectedSymptom(e.target.value)}
            >
              <option value="">Select a symptom</option>
              {Object.keys(symptomCauses).map((symptom) => (
                <option key={symptom} value={symptom}>
                  {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                </option>
              ))}
            </select>

            {selectedSymptom && (
              <div className="symptom-info">
                <h3>{selectedSymptom.charAt(0).toUpperCase() + selectedSymptom.slice(1)}</h3>
                <p>{symptomCauses[selectedSymptom]}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
