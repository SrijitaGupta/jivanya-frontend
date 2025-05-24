import React from "react";
import "../styles/Hormones.css";
import Hormone1Img from "../assets/hormonesone.jpg";
import  HormoneCauses from "../assets/hormones-causes.jpg";
import Foodcravings from "../assets/hormones-foodcravings.jpg";
import Bloating from "../assets/hormones-bloating.jpg";
import Mgdrop from "../assets/hormones-mg-drop.jpg";

const Hormones = () => {
  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const placeholderCauses = "https://via.placeholder.com/300x300?text=Causes+Image";
  const placeholderTreatment = "https://via.placeholder.com/400x300?text=Treatment+Image";
  const placeholderSymptoms = "https://via.placeholder.com/300x300?text=Symptoms+Image";

  return (
    <div className="hormones-page">
      <div className="hormones-header">
        <h1>Hormones and weight</h1>
        <div className="hormones-buttons">
          <button onClick={() => scrollTo("symptoms")}>Symptoms</button>
          <button onClick={() => scrollTo("risk")}>Causes & Risk Factors</button>
          <button onClick={() => scrollTo("treatment")}>Treatment</button>
        </div>
      </div>

      {/* Overview */}
      <div className="hormones-section overview" id="overview">
        <div className="overview-image">
          <h2>Is It Normal to Gain Weight During Your Period?</h2>
          <img src={Hormone1Img} alt="Hormonal fluctuations" />
        </div>
        <div className="overview-text">
          <p>
            During your period, it’s normal to gain three to five pounds that goes away after a few days of bleeding.
            It’s a physical symptom of premenstrual syndrome (PMS). More than 90% of women who menstruate experience PMS,
            which includes a wide range of physical, emotional, and behavioral symptoms.
          </p>
          <p>
            PMS includes a wide range of physical, emotional, and behavioral symptoms that affect women several days to
            two weeks before their period.
          </p>
          <p>
            These symptoms are caused by the hormonal changes during the menstrual cycle.
          </p>
          <p>
            Let’s look at a few reasons why women often gain a few pounds during their period.
          </p>
        </div>
      </div>

      {/* Causes */}
      <div className="hormones-section" id="causes">
        <h2>Causes</h2>
        <p>
          Weight gain and that bloated, sore feeling in your abdomen are common symptoms during your period. You might feel this way for a number of reasons.

        </p>
        <div className="causes-image">
          
          <img src={HormoneCauses} alt="Hormonal fluctuations" />
        </div>
        <h2>Hormonal Changes</h2>
        <p>
          Hormonal changes can cause weight gain by increasing water retention.
         In the days before your period, estrogen and progesterone rapidly decrease. This tells your body that it’s time to begin menstruation.
         Estrogen and progesterone also control the way your body regulates fluid. When these hormones fluctuate, the tissues in your body accumulate more water. The result is water retention, or edema.
         Water retention may cause swelling or puffiness in your breasts, stomach, or extremities. This increases body weight, but not fat.</p>

         

        <h2>Bloating</h2>
        <p>
         Period bloating or stomach cramps can make your clothes feel tight and uncomfortable. This isn’t true weight gain, but you might feel like you’ve gained a few extra pounds.
         During your period, hormonal changes can increase gas in your gastrointestinal (GI) tract and cause bloating. Water retention in your abdomen may also lead to bloating.
         Bloating can be described as feeling tight or swollen in your stomach or other parts of your body.</p>
          <div className="Bloating-image">
          
          <img src={Bloating} alt="Bloating" />
        </div>

        <h2>Food Cravings</h2>
         <div className="foodcravings-container">
         <div className="Foodcravings-image">
         <img src={Foodcravings} alt="Food cravings" />
        </div>
        <p>
         The hormonal changes during your period can also make you overeat. In the week before your period,
         progesterone levels increase. Progesterone is an appetite stimulant. As progesterone rises, you might eat more than usual.
         Your metabolic rate fluctuates during your menstrual cycle, so when it rises — and your body is burning more calories —
         you might have a bigger appetite and crave high-calorie foods.
        </p>
        </div>

        <h2>Decrease in Magnesium</h2>
        <p>
          When your period begins, magnesium levels gradually decrease. This drop can provoke sugar cravings and contribute to weight gain.Magnesium is a mineral that regulates your body’s hydration status. Low levels of magnesium can cause dehydration.However, dehydration can mask itself as hunger. It can also make you desire sugary foods when you’re just thirsty.Eating high-sugar foods can contribute to weight gain.
        </p>
         <div className="Mgdrop-image">
          
          <img src={Mgdrop} alt="Drop In magnesium" />
        </div>
        
        <h2>Less Physical Activity</h2>
        <p>
          When you have bloating and cramps, you might be more likely to skip exercise. This can contribute to weight gain, especially if you have increased hunger or cravings.
         A week before your period, estrogen and progesterone both increase, causing fatigue and low endurance. It might feel uncomfortable to exercise as it gets closer to your period.

        </p>
        <h2>Other Symptoms</h2>
        <ul>
          <li>Tender breasts</li>
          <li>Constipation or diarrhea</li>
          <li>Cramps, headaches, or backaches</li>
          <li>Fatigue</li>
          <li>Skin breakouts (acne)</li>
          <li>Insomnia</li>
          <li>Low noise and light intolerance</li>
          <li>Difficulty sleeping</li>
          <li>Anxiety or stress</li>
          <li>Crying spells</li>
          <li>Mood swings</li>
          <li>Low sex drive</li>
          <li>Low mood, irritability</li>
        </ul>
        
        <h3>Tips to Manage It</h3>
        <ul>
          <li>Drink more water to reduce water retention</li>
          <li>Keep nutritious snacks handy to curb cravings</li>
          <li>Consider magnesium supplements (check with your doctor)</li>
          <li>Move around to reduce bloating and fluid buildup</li>
        </ul>
        <h2>Preventive Habits</h2>
        <ul>
          <li>Limit salt to prevent water retention</li>
          <li>Avoid caffeine and sugar before your period</li>
          <li>Avoid gas-inducing foods throughout the cycle</li>
        </ul>
      </div>

      {/* Symptoms */}
      <div className="hormones-section" id="symptoms">
        <h2>Symptoms of Hormonal Imbalance</h2>
        <div className="symptoms-container">
          <img src={placeholderSymptoms} alt="Symptoms" />
          <ul>
            <li>Fatigue or low energy</li>
            <li>Irregular menstrual cycles</li>
            <li>Acne or oily skin</li>
            <li>Hair thinning or hair loss</li>
            <li>Weight fluctuations</li>
            <li>Mood swings or anxiety</li>
            <li>Low libido</li>
            <li>Hot flashes or night sweats</li>
          </ul>
        </div>
      </div>

      {/* Causes & Risk Factors */}
      <div className="hormones-section" id="risk">
        <h2>Causes & Risk Factors</h2>
        <div className="causes-container">
          <img src={placeholderCauses} alt="Causes" />
          <ul>
            <li>Puberty or menopause</li>
            <li>Polycystic ovary syndrome (PCOS)</li>
            <li>Thyroid disorders</li>
            <li>High stress levels</li>
            <li>Birth control or hormone therapy</li>
            <li>Eating disorders</li>
            <li>Obesity or sedentary lifestyle</li>
          </ul>
        </div>
      </div>

      {/* Treatment */}
      <div className="hormones-section" id="treatment">
        <h2>Treatment</h2>
        <div className="treatment-container">
          <img src={placeholderTreatment} alt="Treatment" />
          <ul>
            <li>Adopt a hormone-balancing diet</li>
            <li>Exercise regularly</li>
            <li>Use stress management techniques</li>
            <li>Sleep 7–9 hours a night</li>
            <li>Consult a doctor for medication or hormone therapy</li>
            <li>Consider natural supplements (e.g., magnesium, vitamin B6)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hormones;
