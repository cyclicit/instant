import React from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'Acme Inc',
      content: 'This platform has transformed how we engage with our customers. The results have been phenomenal!',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'TechStart',
      content: 'The ease of use and powerful features make this our go-to solution for all our digital needs.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'David Wilson',
      role: 'Product Manager',
      company: 'InnovateCo',
      content: 'We saw a 40% increase in user engagement after switching to this platform. Highly recommended!',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">
          Don't just take our word for it. Here's what our clients have to say about our platform.
        </p>
        
        <div className="grid grid-3">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-content">
                <p>"{testimonial.content}"</p>
              </div>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.name} className="avatar" />
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;