import React, { useState } from 'react';
import '../styles/Login.css';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email,
          phoneNumber: phoneNumber || null,
          createdAt: new Date(),
          lastLogin: new Date()
        });
      }
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getAuthErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'Account disabled';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled';
      case 'Phone number is required':
        return 'Phone number is required';
      default:
        return 'Authentication failed. Please try again.';
    }
  };

  return (
    <section className="login-section" id="login">
      <div className="container">
        <div className="login-container">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <p className="login-subtitle">
            {isLogin ? 'Welcome back! Please enter your details.' : 'Create a new account to get started.'}
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                minLength="6"
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className="forgot-password">
                <a href="#forgot-password">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn login-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                isLogin ? 'Login' : 'Sign Up'
              )}
            </button>
          </form>

          <div className="toggle-auth">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button" 
                className="toggle-btn"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>

          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-icons">
              <button type="button" className="social-btn google">
                <i className="fab fa-google"></i> Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;