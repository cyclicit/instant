import React from 'react';
import Products from '../components/Products';


const ProductsPage = ({ addToCart }) => {
  return <Products   addToCart={addToCart}/>;
};

export default ProductsPage;