import React, { useState, useEffect } from "react";
import faqData from "./faqdata";
import "../styles/FAQSearch.css";

function FAQSearch() {
  const [query, setQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Track search state

  // Real-time filtering of FAQ items when search term changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const lowerQuery = query.toLowerCase();
      const results = faqData.filter(
        faq =>
          faq.question.toLowerCase().includes(lowerQuery) ||
          faq.answer.toLowerCase().includes(lowerQuery)
      );
      setFilteredFaqs(results);
    }
  }, [query]);

  const handleSearchClick = () => {
    if (query.trim().length > 0) {
      setIsSearching(true);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsSearching(false); // Reset search results when user changes input
  };

  const toggleAnswer = (index) => {
    const newFaqs = [...filteredFaqs];
    newFaqs[index].isOpen = !newFaqs[index].isOpen;
    setFilteredFaqs(newFaqs);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Search FAQs</h2>
      <div className="faq-search-bar">
        <input
          type="text"
          placeholder="Type your question..."
          value={query}
          onChange={handleInputChange}
          className="faq-input"
        />
        <button className="faq-button" onClick={handleSearchClick}>
          {/* Using solid Font Awesome search icon with fas class */}
          <i className="fas fa-search"></i>
        </button>
      </div>

      {isSearching && (filteredFaqs.length > 0 ? (
        <div>
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="faq-item" onClick={() => toggleAnswer(index)}>
              <div className="faq-question">{faq.question}</div>
              <div className={`faq-answer ${faq.isOpen ? 'show' : ''}`}>{faq.answer}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="faq-no-results">No results found.</p>
      ))}

      {!isSearching && query.trim().length > 0 && (
        <p className="faq-no-results">Start typing to search FAQs...</p>
      )}
    </div>
  );
}

export default FAQSearch;
