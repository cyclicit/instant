import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import '../styles/Products.css';

const Products = ({ addToCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [intendedLawyerId, setIntendedLawyerId] = useState(null);
  const isLoggedIn = auth.currentUser !== null;

  // Check for intended lawyer after authentication
  useEffect(() => {
    const checkAuthAndOpenModal = () => {
      if (isLoggedIn && intendedLawyerId) {
        const lawyer = lawyers.find(l => l.id === intendedLawyerId);
        if (lawyer) {
          setSelectedLawyer(lawyer);
          setShowModal(true);
          setIntendedLawyerId(null);
        }
      }
    };

    checkAuthAndOpenModal();
  }, [isLoggedIn, intendedLawyerId]);

  // Handle login redirect with lawyer ID
  useEffect(() => {
    if (location.state?.intendedLawyer) {
      setIntendedLawyerId(location.state.intendedLawyer);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const lawyers = [
    {
      "id": 1,
      "name": "Sharmin Ahmed",
      "specialty": "Corporate Law",
      "description": "Expert in mergers & acquisitions with 15 years of experience",
      "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "experience": "15 years",
      "rating": 4.9,
      "languages": ["English", "French"],
      "consultationUrl": "https://calendly.com/sharmin-ahmed",
      "price": 350,
      "pricingOptions": [
        { "name": "Initial Consultation", "price": 150, "duration": "30 min" },
        { "name": "Standard Consultation", "price": 350, "duration": "1 hour" },
        { "name": "Extended Consultation", "price": 600, "duration": "2 hours" }
      ]
    },
    {
      "id": 2,
      "name": "Arif Rahman",
      "specialty": "Intellectual Property",
      "description": "Patent and trademark specialist protecting your innovations",
      "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "experience": "12 years",
      "rating": 4.8,
      "languages": ["English", "Bengali"],
      "consultationUrl": "https://calendly.com/arif-rahman",
      "price": 300,
      "pricingOptions": [
        { "name": "Initial Consultation", "price": 100, "duration": "30 min" },
        { "name": "IP Strategy Session", "price": 300, "duration": "1 hour" },
        { "name": "Comprehensive Review", "price": 500, "duration": "2 hours" }
      ]
    },
    {
      "id": 3,
      "name": "Nazmul Hossain",
      "specialty": "Criminal Defense",
      "description": "Former prosecutor with exceptional trial experience",
      "image": "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "experience": "18 years",
      "rating": 4.9,
      "languages": ["English", "Bengali"],
      "consultationUrl": "https://calendly.com/nazmul-hossain",
      "price": 400,
      "pricingOptions": [
        { "name": "Case Evaluation", "price": 200, "duration": "30 min" },
        { "name": "Defense Strategy", "price": 400, "duration": "1 hour" },
        { "name": "Trial Preparation", "price": 750, "duration": "2 hours" }
      ]
    },
    {
      "id": 4,
      "name": "Tasnim Khan",
      "specialty": "Family Law",
      "description": "Compassionate guidance through divorce and custody matters",
      "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "experience": "10 years",
      "rating": 4.7,
      "languages": ["English", "Bengali"],
      "consultationUrl": "https://calendly.com/tasnim-khan",
      "price": 275,
      "pricingOptions": [
        { "name": "Initial Meeting", "price": 125, "duration": "30 min" },
        { "name": "Case Consultation", "price": 275, "duration": "1 hour" },
        { "name": "Comprehensive Planning", "price": 450, "duration": "2 hours" }
      ]
    },
    {
      "id": 5,
      "name": "Rafiqul Islam",
      "specialty": "Real Estate Law",
      "description": "Commercial and residential real estate transactions expert",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "experience": "14 years",
      "rating": 4.8,
      "languages": ["English", "Bengali"],
      "consultationUrl": "https://calendly.com/rafiqul-islam",
      "price": 325,
      "pricingOptions": [
        { "name": "Initial Review", "price": 150, "duration": "30 min" },
        { "name": "Contract Consultation", "price": 325, "duration": "1 hour" },
        { "name": "Transaction Package", "price": 550, "duration": "2 hours" }
      ]
    },
    {
      "id": 6,
      "name": "Farida Akter",
      "specialty": "Immigration Law",
      "description": "Helping individuals and businesses navigate complex immigration processes",
      "image": "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "experience": "9 years",
      "rating": 4.9,
      "languages": ["English", "Bengali", "Arabic"],
      "consultationUrl": "https://calendly.com/farida-akter",
      "price": 250,
      "pricingOptions": [
        { "name": "Initial Assessment", "price": 100, "duration": "30 min" },
        { "name": "Case Strategy", "price": 250, "duration": "1 hour" },
        { "name": "Full Application Review", "price": 400, "duration": "2 hours" }
      ]
    }
  ];

  const handleViewDetails = (lawyerId) => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { 
          intendedLawyer: lawyerId,
          from: '/products'
        } 
      });
      return;
    }
    
    const lawyer = lawyers.find(l => l.id === lawyerId);
    setSelectedLawyer(lawyer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLawyer(null);
  };

  const handleAddToCart = (planName) => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { 
          intendedLawyer: selectedLawyer.id,
          from: '/products'
        } 
      });
      return;
    }

    const plan = selectedLawyer.pricingOptions.find(p => p.name === planName);
    addToCart(selectedLawyer, plan);
    setShowModal(false);
    
    // Optional: Show a success message or notification
    alert(`Consultation with ${selectedLawyer.name} (${planName}) booked!`);
  };

  return (
    <div className="products-container">
      <h1 className="products-title">Our Legal Experts</h1>
      <p className="products-subtitle">Book consultations with top-rated attorneys</p>
      
      <div className="products-grid">
        {lawyers.map((lawyer) => (
          <div key={lawyer.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={lawyer.image} 
                alt={lawyer.name} 
                className="product-image"
              />
              <div className="lawyer-rating">
                ⭐ {lawyer.rating} ({lawyer.experience} experience)
              </div>
            </div>
            <div className="product-content">
              <h3 className="product-name">{lawyer.name}</h3>
              <p className="lawyer-specialty">{lawyer.specialty}</p>
              <p className="product-description">{lawyer.description}</p>
              
              <div className="product-features">
                <h4>Details:</h4>
                <ul>
                  <li>Experience: {lawyer.experience}</li>
                  <li>Languages: {lawyer.languages.join(", ")}</li>
                  <li>Starting at: ${lawyer.pricingOptions[0].price}</li>
                </ul>
              </div>
              
              <div className="product-actions">
                <button 
                  className="demo-button"
                  onClick={() => window.open(lawyer.consultationUrl, '_blank')}
                >
                  View Calendar
                </button>
                <button 
                  className="details-button"
                  onClick={() => handleViewDetails(lawyer.id)}
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lawyer Details Modal */}
      {showModal && selectedLawyer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <h2>{selectedLawyer.name}</h2>
              <p className="lawyer-specialty">{selectedLawyer.specialty}</p>
              <p>{selectedLawyer.description}</p>
              <div className="lawyer-meta">
                <span>⭐ {selectedLawyer.rating} Rating</span>
                <span>📅 {selectedLawyer.experience} Experience</span>
                <span>🗣️ Speaks: {selectedLawyer.languages.join(", ")}</span>
              </div>
            </div>
            
            <div className="modal-body">
              <div className="modal-image-container">
                <img 
                  src={selectedLawyer.image} 
                  alt={selectedLawyer.name} 
                  className="modal-image"
                />
                <a 
                  href={selectedLawyer.consultationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="calendar-link"
                >
                  View Full Availability
                </a>
              </div>
              
              <div className="modal-details">
                <h3>Consultation Options</h3>
                <div className="pricing-options">
                  {selectedLawyer.pricingOptions.map((option, index) => (
                    <div key={index} className="pricing-card">
                      <h4>{option.name}</h4>
                      <div className="price">${option.price}</div>
                      <div className="duration">{option.duration}</div>
                      <button 
                        className="buy-button"
                        onClick={() => handleAddToCart(option.name)}
                      >
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;