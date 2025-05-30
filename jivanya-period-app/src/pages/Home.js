import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MainContent from '../components/maincontent';
import Footer from '../components/Footerone';
import FAQSearch from './FAQSearch'; // Make sure the path is correct

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <MainContent />
      <FAQSearch /> {/* 👈 Add FAQ search here */}
      <Footer />
    </div>
  );
}

export default Home;
