import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import '../styles/Header.css';

const Header = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        setLoadingUserData(true);
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoadingUserData(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const toggleProfile = (e) => {
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      setIsOpen(false);
      setIsProfileOpen(false);
      setUserData(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setIsProfileOpen(false);
    
    if (location.pathname === '/') {
      // Force refresh if already on home page
      window.location.href = '/';
    } else {
      // Normal navigation if not on home page
      navigate('/');
    }
  };

  const getUserName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isProfileOpen) {
        setIsProfileOpen(false);
      }
      if (isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileOpen, isOpen]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <a href="/" onClick={handleLogoClick}>BrandName</a>
          </div>
          
          <button 
            className={`hamburger ${isOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
            <ul>
              <li><Link href="/" onClick={handleLogoClick}>Home</Link></li>
              <li><Link to="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
              
              {user ? (
                <>
                  <li><Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
                  <li className="user-profile">
                    <div className="profile-toggle" onClick={toggleProfile}>
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="profile-pic" />
                      ) : (
                        <div className="profile-initial">
                          {getUserName().charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="profile-info">
                        <span className="profile-name">{getUserName()}</span>
                        <span className="profile-email">{user.email}</span>
                        {userData?.phoneNumber && (
                          <span className="profile-phone">
                            <i className="fas fa-phone"></i> {userData.phoneNumber}
                          </span>
                        )}
                      </div>
                    </div>
                    {isProfileOpen && (
                      <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                        <button onClick={handleLogout} className="logout-btn">
                          Logout
                        </button>
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;








