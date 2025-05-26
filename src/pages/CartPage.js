import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

const CartPage = ({ cartItems, removeFromCart, updateQuantity, clearCart, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    mobile: '',
    address: '',
    paymentMethod: 'bkash',
    transactionId: ''
  });

  // Load order history on component mount and when user changes
  useEffect(() => {
    const loadOrderHistory = () => {
      const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      // Filter orders for current user if logged in
      const filteredOrders = user 
        ? orders.filter(order => order.user.uid === user.uid)
        : orders.filter(order => order.user.uid === 'anonymous');
      setOrderHistory(filteredOrders);
    };
    
    loadOrderHistory();
  }, [user]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToCheckout = () => {
    setIsModalOpen(true);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create order object
      const order = {
        user: {
          uid: user?.uid || 'anonymous',
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile
        },
        shippingAddress: formData.address,
        items: [...cartItems],
        total: calculateTotal(),
        paymentMethod: formData.paymentMethod,
        transactionId: formData.paymentMethod !== 'cash' ? formData.transactionId : null,
        status: 'pending',
        date: new Date().toISOString(),
        orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      };

      // Submit to Formspree
      const formspreeResponse = await fetch('https://formspree.io/f/mgvkjqjk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Order #${order.orderId} from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.mobile,
          address: formData.address,
          paymentMethod: formData.paymentMethod,
          transactionId: formData.transactionId,
          orderId: order.orderId,
          total: order.total.toFixed(2),
          items: order.items.map(item => ({
            name: item.name,
            plan: item.plan,
            quantity: item.quantity,
            price: item.price,
            subtotal: (item.price * item.quantity).toFixed(2)
          })),
          _replyto: formData.email,
          _format: "plain"
        }),
      });

      // Continue with local storage even if Formspree fails
      const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      const updatedOrders = [order, ...existingOrders];
      localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
      setOrderHistory(prev => [order, ...prev]);
      clearCart();
      
      setFormData({
        name: user?.displayName || '',
        email: user?.email || '',
        mobile: '',
        address: '',
        paymentMethod: 'bkash',
        transactionId: ''
      });
      
      setIsModalOpen(false);
      alert(`Order #${order.orderId} placed successfully!`);
    } catch (error) {
      console.error('Error processing order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {/* Order History Section */}
      {orderHistory.length > 0 && (
        <div className="order-history-section">
          <div 
            className="history-header" 
            onClick={() => setShowHistory(!showHistory)}
            style={{ cursor: 'pointer' }}
          >
            <h3>
              <span role="img" aria-label="history">📋</span> Your Order History ({orderHistory.length})
            </h3>
            <span>{showHistory ? '▲' : '▼'}</span>
          </div>
          
          {showHistory && (
            <div className="history-items">
              {orderHistory.map((order) => (
                <div key={order.orderId} className="history-item">
                  <div className="history-summary">
                    <span className="order-id">#{order.orderId}</span>
                    <span className="order-date">{formatDate(order.date)}</span>
                    <span className="order-total">${order.total.toFixed(2)}</span>
                    <span className={`order-status ${order.status}`}>{order.status}</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Items:</strong> {order.items.length} product(s)</p>
                    <p><strong>Payment:</strong> {order.paymentMethod === 'bkash' ? 'bKash/Nagad' : 
                      order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
                    {order.transactionId && (
                      <p><strong>Transaction ID:</strong> {order.transactionId}</p>
                    )}
                    <p><strong>Address:</strong> {order.shippingAddress}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Current Cart Items */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty</p>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="current-cart-header">
            <h2>
              <span role="img" aria-label="cart">🛒</span> Current Order
            </h2>
          </div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.plan}`} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.plan} Plan</p>
                  <p>${item.price}</p>
                </div>
                <div className="item-quantity">
                  <button 
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Tax</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            
            <button 
              className="checkout-button"
              onClick={handleProceedToCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
            
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </>
      )}

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
              disabled={isProcessing}
            >
              &times;
            </button>
            
            <h2>Complete Your Order</h2>
            <p className="order-total">Total: ${calculateTotal().toFixed(2)}</p>
            
            <form onSubmit={handleSubmitOrder}>
              {/* Honeypot spam protection */}
              <input type="text" name="_gotcha" style={{display: 'none'}} />
              
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Shipping Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                >
                  <option value="bkash">bKash/Nagad-01577148188</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash on Delivery</option>
                </select>
              </div>
              
              {formData.paymentMethod !== 'cash' && (
                <div className="form-group">
                  <label>
                    {formData.paymentMethod === 'bkash' ? 'bKash/Nagad Transaction ID *' : 'Card Number *'}
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    required={formData.paymentMethod !== 'cash'}
                    placeholder={
                      formData.paymentMethod === 'bkash' ? 
                      'Enter bKash/Nagad Transaction ID' : 
                      'Enter Card Number'
                    }
                  />
                </div>
              )}
              
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;