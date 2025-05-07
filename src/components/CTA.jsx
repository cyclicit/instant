import React from 'react';
import '../styles/CTA.css';

const CTA = () => {
  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Join thousands of satisfied customers who are already using our platform.</p>
          <div className="cta-buttons">
            <a href="#contact" className="btn">Start Free Trial</a>
            <a href="#contact" className="btn btn-secondary">Contact Sales</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;