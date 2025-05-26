import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import '../styles/Products.css';

const Products = ({ addToCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [intendedProductId, setIntendedProductId] = useState(null);
  const isLoggedIn = auth.currentUser !== null;

  // Check for intended product after authentication
  useEffect(() => {
    const checkAuthAndOpenModal = () => {
      if (isLoggedIn && intendedProductId) {
        const product = demoProducts.find(p => p.id === intendedProductId);
        if (product) {
          setSelectedProduct(product);
          setShowModal(true);
          setIntendedProductId(null);
        }
      }
    };

    checkAuthAndOpenModal();
  }, [isLoggedIn, intendedProductId]);

  // Handle login redirect with product ID
  useEffect(() => {
    if (location.state?.intendedProduct) {
      setIntendedProductId(location.state.intendedProduct);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const demoProducts = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'A fully responsive online store with cart functionality',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      features: ['Product catalog', 'Shopping cart', 'Payment integration'],
      demoUrl: 'https://ecommerce-demo.yoursite.com',
      price: 299,
      pricingOptions: [
        { name: 'Basic', price: 99, features: ['Basic features', 'Email support'] },
        { name: 'Standard', price: 199, features: ['All basic features', 'Priority support'] },
        { name: 'Premium', price: 299, features: ['All features', '24/7 support', 'Customizations'] }
      ]
    },
    {
      id: 2,
      name: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      features: ['Engagement analytics', 'Post scheduling', 'Audience insights'],
      demoUrl: 'https://social-demo.yoursite.com',
      price: 199,
      pricingOptions: [
        { name: 'Basic', price: 99, features: ['Basic analytics'] },
        { name: 'Pro', price: 199, features: ['Advanced analytics', 'Team access'] }
      ]
    },
    {
      id: 3,
      name: 'Project Management Tool',
      description: 'Collaborative workspace for team projects',
      image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      features: ['Task management', 'Team collaboration', 'Progress tracking'],
      demoUrl: 'https://projects-demo.yoursite.com',
      price: 249,
      pricingOptions: [
        { name: 'Starter', price: 99, features: ['Up to 5 users'] },
        { name: 'Business', price: 249, features: ['Unlimited users', 'Advanced reporting'] }
      ]
    }
  ];

  const handleViewDetails = (productId) => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { 
          intendedProduct: productId,
          from: '/products'
        } 
      });
      return;
    }
    
    const product = demoProducts.find(p => p.id === productId);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (planName) => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { 
          intendedProduct: selectedProduct.id,
          from: '/products'
        } 
      });
      return;
    }

    const plan = selectedProduct.pricingOptions.find(p => p.name === planName);
    addToCart(selectedProduct, plan);
    setShowModal(false);
    
    // Optional: Show a success message or notification
    alert(`${selectedProduct.name} (${planName} Plan) added to cart!`);
  };

  return (
    <div className="products-container">
      <h1 className="products-title">Our Product Demos</h1>
      <p className="products-subtitle">Explore our featured website templates</p>
      
      <div className="products-grid">
        {demoProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image"
              />
            </div>
            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-features">
                <h4>Key Features:</h4>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="product-actions">
                <button 
                  className="demo-button"
                  onClick={() => window.open(product.demoUrl, '_blank')}
                >
                  Live Demo
                </button>
                <button 
                  className="details-button"
                  onClick={() => handleViewDetails(product.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
            </div>
            
            <div className="modal-body">
              <div className="modal-image-container">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="modal-image"
                />
              </div>
              
              <div className="modal-details">
                <h3>Pricing Options</h3>
                <div className="pricing-options">
                  {selectedProduct.pricingOptions.map((option, index) => (
                    <div key={index} className="pricing-card">
                      <h4>{option.name}</h4>
                      <div className="price">${option.price}</div>
                      <ul className="plan-features">
                        {option.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                      <button 
                        className="buy-button"
                        onClick={() => handleAddToCart(option.name)}
                      >
                        Add to Cart
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