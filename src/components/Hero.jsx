import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Build Amazing Digital Experiences</h1>
            <p className="lead">
              Our platform helps you create beautiful websites and applications 
              that your users will love.
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