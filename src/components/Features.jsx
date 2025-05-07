import React from 'react';
import '../styles/Features.css';

const Features = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Fast Performance',
      description: 'Optimized for speed and efficiency to deliver the best user experience.'
    },
    {
      icon: '🛠️',
      title: 'Easy to Use',
      description: 'Intuitive interface that makes it simple for anyone to get started.'
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Looks great on any device, from desktop to mobile phones.'
    },
    {
      icon: '🔒',
      title: 'Secure',
      description: 'Built with security in mind to protect your data.'
    },
    {
      icon: '🔄',
      title: 'Regular Updates',
      description: 'We constantly improve our product with new features.'
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Get insights into how your users interact with your product.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title">Amazing Features</h2>
        <p className="section-subtitle">
          Our platform comes packed with all the features you need to succeed in the digital world.
        </p>
        
        <div className="grid grid-3">
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