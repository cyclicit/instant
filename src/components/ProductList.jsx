import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { getProducts } from '../services/productService';
import '../styles/Products.css';

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [intendedProductId, setIntendedProductId] = useState(null);
  const isLoggedIn = auth.currentUser !== null;

  // Check for intended product after authentication
  useEffect(() => {
    const checkAuthAndOpenModal = () => {
      if (isLoggedIn && intendedProductId) {
        const product = Object.values(productsByCategory)
          .flat()
          .find(p => p._id === intendedProductId);
        if (product) {
          setSelectedProduct(product);
          setShowModal(true);
          setIntendedProductId(null);
        }
      }
    };

    checkAuthAndOpenModal();
  }, [isLoggedIn, intendedProductId, productsByCategory]);

  // Handle login redirect with product ID
  useEffect(() => {
    if (location.state?.intendedProduct) {
      setIntendedProductId(location.state.intendedProduct);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts({ sort: '-ratings,price' });
        
        const grouped = data.reduce((acc, product) => {
          const { category } = product;
          if (!acc[category]) acc[category] = [];
          acc[category].push({
            ...product,
            features: [
              `Price: $${product.price.toFixed(2)}`,
              `Rating: ${product.ratings}/5`,
              `In Stock: ${product.stock}`,
              ...(product.featured ? ['Featured Product'] : [])
            ],
            pricingOptions: [
              {
                name: 'Standard',
                price: product.price,
                features: ['Basic features', 'Email support']
              },
              {
                name: 'Premium',
                price: product.price * 1.5,
                features: ['All features', 'Priority support', 'Customizations']
              }
            ]
          });
          return acc;
        }, {});

        setProductsByCategory(grouped);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (productId) => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { 
          intendedProduct: productId,
          from: location.pathname 
        } 
      });
      return;
    }
    
    const product = Object.values(productsByCategory)
      .flat()
      .find(p => p._id === productId);
    
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handlePayment = (planName) => {
    console.log(`Initiating payment for ${selectedProduct.name} - ${planName}`);
    alert(`Redirecting to payment for ${planName} plan`);
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="products-container">
      <h1 className="products-title">Our Products</h1>
      <p className="products-subtitle">Browse our collection by category</p>

      {Object.entries(productsByCategory).map(([category, products]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.images?.[0] } 
                    alt={product.name} 
                    className="product-image"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = '';
                    }}
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
                      onClick={() => window.open('#', '_blank')}
                    >
                      Live Demo
                    </button>
                    <button 
                      className="details-button"
                      onClick={() => handleViewDetails(product._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

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
                  src={selectedProduct.images?.[0] } 
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
                      <div className="price">${option.price.toFixed(2)}</div>
                      <ul className="plan-features">
                        {option.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                      <button 
                        className="buy-button"
                        onClick={() => handlePayment(option.name)}
                      >
                        Select Plan
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

export default ProductList;