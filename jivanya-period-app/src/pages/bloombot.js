import React, { useState, useEffect, useRef } from "react";
import "../styles/bloomchat.css";
import botIcon from "../assets/bot-icon.jpg";
import userIcon from "../assets/user-icon.jpg";
import bloombotImage from "../assets/bloombot-main.jpg";

const questions = [
  { key: "Age", question: "How old are you?" },
  { key: "Feeling sad or Tearful", question: "Have you been feeling sad, tearful, or emotionally low lately?" },
  { key: "Irritable towards baby & partner", question: "Do you often feel irritable toward your baby or partner?" },
  { key: "Trouble sleeping at night", question: "Are you having trouble sleeping at night, even when your baby sleeps?" },
  { key: "Problems concentrating or making decision", question: "Have you had difficulty concentrating or making decisions?" },
  { key: "Overeating or loss of appetite", question: "Have you noticed overeating or a loss of appetite recently?" },
  { key: "Feeling anxious", question: "Do you frequently feel anxious or restless?" },
  { key: "Feeling of guilt", question: "Do you often feel guilty or feel like you're not a good mother?" },
  { key: "Problems of bonding with baby", question: "Are you having difficulty bonding with your baby?" },
  { key: "Suicide attempt", question: "Have you ever had thoughts of harming yourself or attempted suicide?" },
];

const Bloombot = () => {
  const [chat, setChat] = useState([{ from: "bot", text: questions[0].question }]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);

  const isFirstQuestion = chat.length === 1;

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    if (inputRef.current && isFirstQuestion) {
      inputRef.current.focus();
    }
  }, [isFirstQuestion]);

  const isValidAnswer = (text) => {
    const currentKey = questions[currentQuestion]?.key;
    const val = text.trim().toLowerCase();

    if (currentKey === "Age") {
      const num = Number(text.trim());
      return !isNaN(num) && num > 0 && Number.isInteger(num);
    }

    return val === "yes" || val === "no";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!isValidAnswer(input)) {
      const currentKey = questions[currentQuestion]?.key;
      setError(
        currentKey === "Age"
          ? "Please enter a valid age (number)."
          : 'Please answer with "yes" or "no" only.'
      );
      return;
    }

    setError("");

    const userAnswer = input.trim();
    const updatedAnswers = [...answers, userAnswer];

    setChat((prev) => [...prev, { from: "user", text: userAnswer }]);
    setAnswers(updatedAnswers);
    setInput("");

    const nextIndex = currentQuestion + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestion(nextIndex);
      setTimeout(() => {
        setChat((prev) => [...prev, { from: "bot", text: questions[nextIndex].question }]);
      }, 600);
    } else {
      setIsSubmitting(true);
      try {
        const response = await fetch("https://postpartum.onrender.com/next-question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: updatedAnswers }),
        });

        const data = await response.json();
        console.log("API response:", data);

        const botMessage = data.message || "Sorry, no response from server.";
        setResult(botMessage);
        setChat((prev) => [...prev, { from: "bot", text: botMessage }]);
      } catch (error) {
        console.error("Error:", error);
        setChat((prev) => [
          ...prev,
          { from: "bot", text: "Something went wrong. Please try again later." },
        ]);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-left">
        <img src={bloombotImage} alt="Bloombot" className="bloombot-image" />
        <p>
          Hello, ABC
          <br />
          I'm your smart assistant ready to help you with quick answers and smooth support.
          <br />
          Let's make things bloom with ease!
        </p>
        <button
          className="start-button"
          onClick={() => {
            setChat([{ from: "bot", text: questions[0].question }]);
            setAnswers([]);
            setCurrentQuestion(0);
            setInput("");
            setResult(null);
            setError("");
            if (inputRef.current) inputRef.current.focus();
          }}
        >
          Start
        </button>
      </div>

      <div className="chat-right">
        <div className="chat-header">
          <img src={botIcon} alt="Bot" className="bot-avatar" />
          <div>
            <h4>Bloombot</h4>
            <small style={{ color: "limegreen" }}>🟢 Online Now</small>
          </div>
        </div>

        <div className="chat-box" ref={chatBoxRef}>
          {chat.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.from}`}>
              <img
                src={msg.from === "bot" ? botIcon : userIcon}
                alt="avatar"
                className="avatar"
              />
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {!result && (
          <div className="chat-input">
            <input
              ref={inputRef}
              type="text"
              value={input}
              disabled={isSubmitting}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError("");
              }}
              placeholder={
                questions[currentQuestion]?.key === "Age"
                  ? "Please enter your age (number)"
                  : 'Please answer with "yes" or "no" only'
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isSubmitting && isValidAnswer(input)) {
                  handleSend();
                }
              }}
            />
            <button onClick={handleSend} disabled={isSubmitting || !isValidAnswer(input)}>
              Send
            </button>
          </div>
        )}

        {error && <p style={{ color: "red", marginTop: 5 }}>{error}</p>}
      </div>
    </div>
  );
};

export default Bloombot;
