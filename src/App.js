import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  // Get user-specific cart key
  const getCartKey = (currentUser) => {
    return currentUser ? `cart_${currentUser.uid}` : 'cart_anonymous';
  };

  // Load cart from storage when user changes
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartKey = getCartKey(user);
        const savedCart = localStorage.getItem(cartKey);
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
      } catch (error) {
        console.error('Failed to load cart:', error);
        setCartItems([]);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to storage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        localStorage.setItem(getCartKey(user), JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart:', error);
        // Optionally notify user or implement fallback
      }
    };

    saveCart();
  }, [cartItems, user]);

  // Handle auth state changes and cart merging
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User logged in - merge anonymous cart with user cart
        await handleCartMerge(user);
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Merge anonymous cart with user cart when logging in
  const handleCartMerge = async (user) => {
    try {
      const anonymousCartKey = 'cart_anonymous';
      const userCartKey = getCartKey(user);
      
      const anonymousCart = localStorage.getItem(anonymousCartKey);
      const userCart = localStorage.getItem(userCartKey);

      if (anonymousCart) {
        const parsedAnonymousCart = JSON.parse(anonymousCart);
        
        if (userCart) {
          // Merge carts - more sophisticated logic can be added here
          const parsedUserCart = JSON.parse(userCart);
          const mergedCart = mergeCarts(parsedUserCart, parsedAnonymousCart);
          
          setCartItems(mergedCart);
          localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
        } else {
          // No existing user cart, just use the anonymous one
          setCartItems(parsedAnonymousCart);
          localStorage.setItem(userCartKey, anonymousCart);
        }
        
        // Clear anonymous cart
        localStorage.removeItem(anonymousCartKey);
      }
    } catch (error) {
      console.error('Failed to merge carts:', error);
    }
  };

  // Basic cart merging logic (can be enhanced)
  const mergeCarts = (userCart, anonymousCart) => {
    const merged = [...userCart];
    
    anonymousCart.forEach(item => {
      const existingItem = merged.find(
        i => i.id === item.id && i.plan === item.plan
      );
      
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        merged.push(item);
      }
    });
    
    return merged;
  };

  // Add item to cart
  const addToCart = (product, plan) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(
        item => item.id === product.id && item.plan === plan.name
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.plan === plan.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Add new item to cart
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          plan: plan.name,
          price: plan.price,
          quantity: 1
        }
      ];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemToRemove) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === itemToRemove.id && item.plan === itemToRemove.plan)
      )
    );
  };

  // Update item quantity
  const updateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(prevItem =>
        prevItem.id === item.id && prevItem.plan === item.plan
          ? { ...prevItem, quantity: newQuantity }
          : prevItem
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Header 
          user={user} 
          cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/products" 
              element={<ProductsPage addToCart={addToCart} />} 
            />
            <Route 
              path="/cart" 
              element={
                <CartPage 
                  cartItems={cartItems} 
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  clearCart={clearCart}
                />
              } 
            />

            {/* Protected Route */}
            <Route
              path="/dashboard"
              element={user ? <DashboardPage /> : <Navigate to="/login" />}
            />

            {/* Redirect to home if route doesn't exist */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;