import React from 'react';
import '../styles/Features.css';

const Features = () => {
  const features = [
    {
      icon: '⚖️',
      title: 'Expert Lawyers',
      description: 'Connect with verified legal professionals across all specialties in Bangladesh.'
    },
    {
      icon: '⭐',
      title: 'Client Ratings',
      description: 'Read genuine reviews and ratings from previous clients to make informed choices.'
    },
    {
      icon: '📅',
      title: 'Easy Booking',
      description: 'Simple appointment scheduling system with instant confirmation.'
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'Clear fee structures with no hidden charges for legal services.'
    },
    {
      icon: '🔒',
      title: 'Confidential Consultations',
      description: 'Secure platform that protects your privacy and case details.'
    },
    {
      icon: '📱',
      title: '24/7 Availability',
      description: 'Access lawyer profiles and book consultations anytime, anywhere.'
    },
    {
      icon: '🏛️',
      title: 'Court Specialists',
      description: 'Find lawyers with specific court experience and success rates.'
    },
    {
      icon: '📝',
      title: 'Document Review',
      description: 'Get professional review of your legal documents before submission.'
    },
    {
      icon: '🔄',
      title: 'Case Tracking',
      description: 'Monitor your case progress through our platform.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title">Why Choose Our Platform</h2>
        <p className="section-subtitle">
          We provide the most comprehensive legal service platform in Bangladesh with features designed for your convenience.
        </p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;