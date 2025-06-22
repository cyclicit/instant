import React from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Fatema Begum',
      role: 'Business Owner',
      location: 'Dhaka',
      content: 'Advocate Rahman helped me win a complex property dispute case that had been dragging for years. His expertise in land laws is unmatched!',
      avatar: 'https://i.ibb.co/4W2yXzP/bangladeshi-woman1.jpg',
      rating: 5
    },
    {
      name: 'Md. Jamal Uddin',
      role: 'Corporate Executive',
      location: 'Chittagong',
      content: 'The divorce consultation I received was compassionate yet legally thorough. Barrister Akhter handled my sensitive case with professionalism.',
      avatar: 'https://i.ibb.co/0jq7R0J/bangladeshi-man1.jpg',
      rating: 4
    },
    {
      name: 'Nusrat Jahan',
      role: 'University Student',
      location: 'Sylhet',
      content: 'I was falsely accused in a cyber crime case. Lawyer Tasnim fought for my innocence and got the charges dismissed. Forever grateful!',
      avatar: 'https://i.ibb.co/7Q3Yh0N/bangladeshi-woman2.jpg',
      rating: 5
    },
    {
      name: 'Rahim Khan',
      role: 'Expatriate',
      location: 'Comilla',
      content: 'From the UK, I needed help with inheritance laws. The video consultation was seamless and the advice saved me thousands.',
      avatar: 'https://i.ibb.co/3R4K3b0/bangladeshi-man2.jpg',
      rating: 5
    }
  ];

  // Function to render star ratings
  const renderStars = (rating) => {
    return (
      <div className="rating-stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
        ))}
      </div>
    );
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">Client Success Stories</h2>
        <p className="section-subtitle">
          Hear from Bangladeshis who found legal solutions through our platform
        </p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-content">
                <p className="quote">"{testimonial.content}"</p>
                {renderStars(testimonial.rating)}
              </div>
              <div className="testimonial-author">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="avatar" 
                  loading="lazy"
                />
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role} • {testimonial.location}</p>
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