import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Book the best Lawyer in Bangladesh</h1>
            <p className="lead">
              Our platform helps you connect with top legal professionals in Bangladesh. Whether you need advice, representation, or consultation, we have the right lawyer for you.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn">Get Started</a>
              <a href="#features" className="btn btn-secondary">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;