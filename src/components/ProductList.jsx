import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import '../styles/Productlist.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts({
          category: 'electronics',
          sort: '-ratings,price',
          limit: 5
        });
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product-list">
      <h2>Featured Electronics</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            {/* Product Image */}
            {product.images?.length > 0 && (
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300?text=No+Image';
                }}
              />
            )}
            
            <div className="product-details">
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <p className="rating">
                Rating: {product.ratings}/5
                <span className="stars">{'★'.repeat(Math.round(product.ratings))}</span>
              </p>
              <p className="description">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;